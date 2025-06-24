import { FinancialAccount } from '../entities/financial-account.model';
import { Op, WhereOptions } from 'sequelize';

export interface FinancialAccountFilters {
  accountNumber?: string;
  accountType?: 'checking' | 'savings' | 'investment' | 'credit';
  bankName?: string;
  branchCode?: string;
  isActive?: boolean;
  currency?: string;
  page?: number;
  limit?: number;
}

export interface FinancialAccountSearchResult {
  accounts: FinancialAccount[];
  total: number;
  page: number;
  totalPages: number;
}

export class FinancialAccountRepository {
  async create(data: Partial<FinancialAccount>): Promise<FinancialAccount> {
    return await FinancialAccount.create(data);
  }

  async findById(id: string): Promise<FinancialAccount | null> {
    return await FinancialAccount.findByPk(id);
  }

  async findAll(filters: FinancialAccountFilters = {}): Promise<FinancialAccountSearchResult> {
    const {
      accountNumber,
      accountType,
      bankName,
      branchCode,
      isActive,
      currency,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};
    if (accountNumber) where.accountNumber = { [Op.iLike]: `%${accountNumber}%` };
    if (accountType) where.accountType = accountType;
    if (bankName) where.bankName = { [Op.iLike]: `%${bankName}%` };
    if (branchCode) where.branchCode = { [Op.iLike]: `%${branchCode}%` };
    if (typeof isActive === 'boolean') where.isActive = isActive;
    if (currency) where.currency = currency;

    const offset = (page - 1) * limit;
    const { count, rows } = await FinancialAccount.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      accounts: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<FinancialAccount>): Promise<FinancialAccount | null> {
    const acc = await FinancialAccount.findByPk(id);
    if (!acc) return null;
    await acc.update(data);
    return acc;
  }

  async delete(id: string): Promise<boolean> {
    const acc = await FinancialAccount.findByPk(id);
    if (!acc) return false;
    await acc.destroy();
    return true;
  }
} 