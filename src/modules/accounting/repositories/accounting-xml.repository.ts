import { AccountingXml, AccountingXmlStatus } from '../entities/accounting-xml.model';
import { Op, WhereOptions } from 'sequelize';

export interface AccountingXmlFilters {
  status?: AccountingXmlStatus;
  accessKey?: string;
  issuerCnpj?: string;
  recipientCnpj?: string;
  page?: number;
  limit?: number;
}

export interface AccountingXmlSearchResult {
  xmls: AccountingXml[];
  total: number;
  page: number;
  totalPages: number;
}

export class AccountingXmlRepository {
  async create(data: Partial<AccountingXml>): Promise<AccountingXml> {
    return await AccountingXml.create(data);
  }

  async findById(id: string): Promise<AccountingXml | null> {
    return await AccountingXml.findByPk(id);
  }

  async findByAccessKey(accessKey: string): Promise<AccountingXml | null> {
    return await AccountingXml.findOne({ where: { accessKey } });
  }

  async findAll(filters: AccountingXmlFilters = {}): Promise<AccountingXmlSearchResult> {
    const {
      status,
      accessKey,
      issuerCnpj,
      recipientCnpj,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};
    if (status) where.status = status;
    if (accessKey) where.accessKey = { [Op.iLike]: `%${accessKey}%` };
    if (issuerCnpj) where.issuerCnpj = { [Op.iLike]: `%${issuerCnpj}%` };
    if (recipientCnpj) where.recipientCnpj = { [Op.iLike]: `%${recipientCnpj}%` };

    const offset = (page - 1) * limit;
    const { count, rows } = await AccountingXml.findAndCountAll({
      where,
      limit,
      offset,
      order: [['issueDate', 'DESC']]
    });

    return {
      xmls: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<AccountingXml>): Promise<AccountingXml | null> {
    const xml = await AccountingXml.findByPk(id);
    if (!xml) return null;
    await xml.update(data);
    return xml;
  }

  async delete(id: string): Promise<boolean> {
    const xml = await AccountingXml.findByPk(id);
    if (!xml) return false;
    await xml.destroy();
    return true;
  }
} 