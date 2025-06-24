import { BankIntegrationRepository, BankIntegrationFilters, BankIntegrationSearchResult } from '../repositories/bank-integration.repository';
import { BankIntegration } from '../entities/bank-integration.model';

export class BankIntegrationService {
  private repository: BankIntegrationRepository;

  constructor() {
    this.repository = new BankIntegrationRepository();
  }

  async createIntegration(data: Partial<BankIntegration>): Promise<BankIntegration> {
    return await this.repository.create(data);
  }

  async getIntegrationById(id: string): Promise<BankIntegration | null> {
    return await this.repository.findById(id);
  }

  async getAllIntegrations(filters: BankIntegrationFilters): Promise<BankIntegrationSearchResult> {
    return await this.repository.findAll(filters);
  }

  async updateIntegration(id: string, data: Partial<BankIntegration>): Promise<BankIntegration | null> {
    return await this.repository.update(id, data);
  }

  async deleteIntegration(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
} 