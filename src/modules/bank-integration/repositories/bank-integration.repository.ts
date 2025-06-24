import { BankIntegration } from '../entities/bank-integration.model';
import { Op, WhereOptions } from 'sequelize';

export interface BankIntegrationFilters {
  bankName?: string;
  integrationType?: 'api' | 'file' | 'manual';
  accountNumber?: string;
  accountType?: 'checking' | 'savings' | 'investment';
  isActive?: boolean;
  syncFrequency?: 'daily' | 'weekly' | 'monthly';
  page?: number;
  limit?: number;
}

export interface BankIntegrationSearchResult {
  integrations: BankIntegration[];
  total: number;
  page: number;
  totalPages: number;
}

export class BankIntegrationRepository {
  async create(data: Partial<BankIntegration>): Promise<BankIntegration> {
    return await BankIntegration.create(data);
  }

  async findById(id: string): Promise<BankIntegration | null> {
    return await BankIntegration.findByPk(id);
  }

  async findAll(filters: BankIntegrationFilters = {}): Promise<BankIntegrationSearchResult> {
    const {
      bankName,
      integrationType,
      accountNumber,
      accountType,
      isActive,
      syncFrequency,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};
    if (bankName) where.bankName = { [Op.iLike]: `%${bankName}%` };
    if (integrationType) where.integrationType = integrationType;
    if (accountNumber) where.accountNumber = { [Op.iLike]: `%${accountNumber}%` };
    if (accountType) where.accountType = accountType;
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (syncFrequency) where.syncFrequency = syncFrequency;

    const offset = (page - 1) * limit;
    const { count, rows } = await BankIntegration.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      integrations: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<BankIntegration>): Promise<BankIntegration | null> {
    const integration = await BankIntegration.findByPk(id);
    if (!integration) return null;
    await integration.update(data);
    return integration;
  }

  async delete(id: string): Promise<boolean> {
    const integration = await BankIntegration.findByPk(id);
    if (!integration) return false;
    await integration.destroy();
    return true;
  }
} 