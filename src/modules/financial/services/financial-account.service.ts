import { FinancialAccountRepository, FinancialAccountFilters, FinancialAccountSearchResult } from '../repositories/financial-account.repository';
import { FinancialAccount } from '../entities/financial-account.model';

export class FinancialAccountService {
  private repository: FinancialAccountRepository;

  constructor() {
    this.repository = new FinancialAccountRepository();
  }

  async createAccount(data: Partial<FinancialAccount>): Promise<FinancialAccount> {
    return await this.repository.create(data);
  }

  async getAccountById(id: string): Promise<FinancialAccount | null> {
    return await this.repository.findById(id);
  }

  async getAllAccounts(filters: FinancialAccountFilters): Promise<FinancialAccountSearchResult> {
    return await this.repository.findAll(filters);
  }

  async updateAccount(id: string, data: Partial<FinancialAccount>): Promise<FinancialAccount | null> {
    return await this.repository.update(id, data);
  }

  async deleteAccount(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
} 