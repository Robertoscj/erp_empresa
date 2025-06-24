import { AccountingXmlRepository, AccountingXmlFilters, AccountingXmlSearchResult } from '../repositories/accounting-xml.repository';
import { AccountingXml, AccountingXmlStatus } from '../entities/accounting-xml.model';

export class AccountingXmlService {
  private repository: AccountingXmlRepository;

  constructor() {
    this.repository = new AccountingXmlRepository();
  }

  async importXml(data: Partial<AccountingXml>): Promise<AccountingXml> {
    if (data.accessKey) {
      const existing = await this.repository.findByAccessKey(data.accessKey);
      if (existing) throw new Error('Chave de acesso já importada');
    }
    return await this.repository.create(data);
  }

  async getXmlById(id: string): Promise<AccountingXml | null> {
    return await this.repository.findById(id);
  }

  async getAllXmls(filters: AccountingXmlFilters): Promise<AccountingXmlSearchResult> {
    return await this.repository.findAll(filters);
  }

  async updateXml(id: string, data: Partial<AccountingXml>): Promise<AccountingXml | null> {
    return await this.repository.update(id, data);
  }

  async deleteXml(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
} 