import { Op, WhereOptions } from 'sequelize';
import { Client, ClientStatus, ClientType } from '../entities/client.model';

export interface ClientFilters {
  name?: string;
  type?: ClientType;
  status?: ClientStatus;
  email?: string;
  cpfCnpj?: string;
  page?: number;
  limit?: number;
}

export interface ClientSearchResult {
  clients: Client[];
  total: number;
  page: number;
  totalPages: number;
}

export class ClientRepository {
  async create(data: Partial<Client>): Promise<Client> {
    return await Client.create(data);
  }

  async findById(id: string): Promise<Client | null> {
    return await Client.findByPk(id);
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Client | null> {
    return await Client.findOne({
      where: { cpfCnpj }
    });
  }

  async findByEmail(email: string): Promise<Client | null> {
    return await Client.findOne({
      where: { email }
    });
  }

  async findAll(filters: ClientFilters = {}): Promise<ClientSearchResult> {
    const {
      name,
      type,
      status,
      email,
      cpfCnpj,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (email) {
      where.email = { [Op.iLike]: `%${email}%` };
    }

    if (cpfCnpj) {
      where.cpfCnpj = { [Op.iLike]: `%${cpfCnpj}%` };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Client.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      clients: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const client = await Client.findByPk(id);
    if (!client) return null;

    await client.update(data);
    return client;
  }

  async delete(id: string): Promise<boolean> {
    const client = await Client.findByPk(id);
    if (!client) return false;

    await client.destroy();
    return true;
  }

  async getActiveClients(): Promise<Client[]> {
    return await Client.findAll({
      where: { status: ClientStatus.ACTIVE },
      order: [['name', 'ASC']]
    });
  }

  async getClientsByType(type: ClientType): Promise<Client[]> {
    return await Client.findAll({
      where: { type },
      order: [['name', 'ASC']]
    });
  }

  async updateBalance(id: string, amount: number): Promise<Client | null> {
    const client = await Client.findByPk(id);
    if (!client) return null;

    const newBalance = parseFloat(client.currentBalance.toString()) + amount;
    await client.update({ currentBalance: newBalance });
    return client;
  }
} 