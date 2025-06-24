import { ClientRepository, ClientFilters, ClientSearchResult } from '../repositories/client.repository';
import { Client, ClientType, ClientStatus } from '../entities/client.model';
import { CreateClientDto } from '../dto/create-client.dto';

export class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async createClient(data: CreateClientDto, userId: string): Promise<Client> {
    // Validações de negócio
    if (data.cpfCnpj) {
      const existingClient = await this.clientRepository.findByCpfCnpj(data.cpfCnpj);
      if (existingClient) {
        throw new Error('CPF/CNPJ já cadastrado');
      }
    }

    if (data.email) {
      const existingClient = await this.clientRepository.findByEmail(data.email);
      if (existingClient) {
        throw new Error('Email já cadastrado');
      }
    }

    const clientData = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      createdBy: userId,
      updatedBy: userId
    };

    return await this.clientRepository.create(clientData);
  }

  async getClientById(id: string): Promise<Client | null> {
    return await this.clientRepository.findById(id);
  }

  async getAllClients(filters: ClientFilters): Promise<ClientSearchResult> {
    return await this.clientRepository.findAll(filters);
  }

  async updateClient(id: string, data: Partial<Client>, userId: string): Promise<Client | null> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    // Validações de negócio para atualização
    if (data.cpfCnpj && data.cpfCnpj !== client.cpfCnpj) {
      const existingClient = await this.clientRepository.findByCpfCnpj(data.cpfCnpj);
      if (existingClient) {
        throw new Error('CPF/CNPJ já cadastrado');
      }
    }

    if (data.email && data.email !== client.email) {
      const existingClient = await this.clientRepository.findByEmail(data.email);
      if (existingClient) {
        throw new Error('Email já cadastrado');
      }
    }

    const updateData = {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate as any) : undefined,
      updatedBy: userId
    };

    return await this.clientRepository.update(id, updateData);
  }

  async deleteClient(id: string): Promise<boolean> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    // Verificar se o cliente tem transações pendentes
    // Aqui você pode adicionar lógica para verificar vendas, contas a receber, etc.

    return await this.clientRepository.delete(id);
  }

  async getActiveClients(): Promise<Client[]> {
    return await this.clientRepository.getActiveClients();
  }

  async getClientsByType(type: ClientType): Promise<Client[]> {
    return await this.clientRepository.getClientsByType(type);
  }

  async updateClientBalance(id: string, amount: number): Promise<Client | null> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    const newBalance = parseFloat(client.currentBalance.toString()) + amount;
    
    // Verificar se o novo saldo não excede o limite de crédito
    if (newBalance > parseFloat(client.creditLimit.toString())) {
      throw new Error('Saldo excede o limite de crédito do cliente');
    }

    return await this.clientRepository.updateBalance(id, amount);
  }

  async getClientStatistics(): Promise<{
    total: number;
    active: number;
    inactive: number;
    individual: number;
    corporate: number;
  }> {
    const allClients = await this.clientRepository.findAll({ limit: 1000 });
    
    const total = allClients.total;
    const active = allClients.clients.filter(c => c.status === ClientStatus.ACTIVE).length;
    const inactive = allClients.clients.filter(c => c.status === ClientStatus.INACTIVE).length;
    const individual = allClients.clients.filter(c => c.type === ClientType.INDIVIDUAL).length;
    const corporate = allClients.clients.filter(c => c.type === ClientType.CORPORATE).length;

    return {
      total,
      active,
      inactive,
      individual,
      corporate
    };
  }
} 