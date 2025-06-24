import { FiscalDocumentRepository, FiscalDocumentFilters, FiscalDocumentSearchResult } from '../repositories/fiscal-document.repository';
import { FiscalDocument, FiscalDocumentType, FiscalDocumentStatus } from '../entities/fiscal-document.model';

export class FiscalDocumentService {
  private repository: FiscalDocumentRepository;

  constructor() {
    this.repository = new FiscalDocumentRepository();
  }

  async createDocument(data: Partial<FiscalDocument>): Promise<FiscalDocument> {
    // Validações de negócio podem ser adicionadas aqui
    if (data.documentNumber) {
      const existing = await this.repository.findByDocumentNumber(data.documentNumber);
      if (existing) throw new Error('Número do documento já cadastrado');
    }
    return await this.repository.create(data);
  }

  async getDocumentById(id: string): Promise<FiscalDocument | null> {
    return await this.repository.findById(id);
  }

  async getAllDocuments(filters: FiscalDocumentFilters): Promise<FiscalDocumentSearchResult> {
    return await this.repository.findAll(filters);
  }

  async updateDocument(id: string, data: Partial<FiscalDocument>): Promise<FiscalDocument | null> {
    return await this.repository.update(id, data);
  }

  async deleteDocument(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
} 