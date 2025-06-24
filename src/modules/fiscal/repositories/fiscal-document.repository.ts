import { FiscalDocument } from '../entities/fiscal-document.model';
import { Op, WhereOptions } from 'sequelize';

export interface FiscalDocumentFilters {
  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  documentType?: 'invoice' | 'receipt' | 'note';
  accessKey?: string;
  issuerCnpj?: string;
  recipientCnpj?: string;
  page?: number;
  limit?: number;
}

export interface FiscalDocumentSearchResult {
  documents: FiscalDocument[];
  total: number;
  page: number;
  totalPages: number;
}

export class FiscalDocumentRepository {
  async create(data: Partial<FiscalDocument>): Promise<FiscalDocument> {
    return await FiscalDocument.create(data);
  }

  async findById(id: string): Promise<FiscalDocument | null> {
    return await FiscalDocument.findByPk(id);
  }

  async findByAccessKey(accessKey: string): Promise<FiscalDocument | null> {
    return await FiscalDocument.findOne({ where: { accessKey } });
  }

  async findAll(filters: FiscalDocumentFilters = {}): Promise<FiscalDocumentSearchResult> {
    const {
      status,
      documentType,
      accessKey,
      issuerCnpj,
      recipientCnpj,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};
    if (status) where.status = status;
    if (documentType) where.documentType = documentType;
    if (accessKey) where.accessKey = { [Op.iLike]: `%${accessKey}%` };
    if (issuerCnpj) where.issuerCnpj = { [Op.iLike]: `%${issuerCnpj}%` };
    if (recipientCnpj) where.recipientCnpj = { [Op.iLike]: `%${recipientCnpj}%` };

    const offset = (page - 1) * limit;
    const { count, rows } = await FiscalDocument.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      documents: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<FiscalDocument>): Promise<FiscalDocument | null> {
    const document = await FiscalDocument.findByPk(id);
    if (!document) return null;
    await document.update(data);
    return document;
  }

  async delete(id: string): Promise<boolean> {
    const document = await FiscalDocument.findByPk(id);
    if (!document) return false;
    await document.destroy();
    return true;
  }

  async findByDocumentNumber(documentNumber: string): Promise<FiscalDocument | null> {
    return await FiscalDocument.findOne({ where: { documentNumber } });
  }
} 