import { Request, Response } from 'express';
import { FiscalDocumentService } from '../services/fiscal-document.service';
import { asyncHandler } from '../../../shared/middlewares/error.middleware';

export class FiscalDocumentController {
  private service: FiscalDocumentService;

  constructor() {
    this.service = new FiscalDocumentService();
  }

  createDocument = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const doc = await this.service.createDocument(data);
    return res.status(201).json({ success: true, data: doc });
  });

  getDocumentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const doc = await this.service.getDocumentById(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Documento não encontrado' });
    }
    return res.json({ success: true, data: doc });
  });

  getAllDocuments = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      type: req.query.type as any,
      status: req.query.status as any,
      documentNumber: req.query.documentNumber as string,
      recipientDocument: req.query.recipientDocument as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };
    const result = await this.service.getAllDocuments(filters);
    return res.json({
      success: true,
      data: result.documents,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateDocument = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const doc = await this.service.updateDocument(id, updateData);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Documento não encontrado' });
    }
    return res.json({ success: true, data: doc });
  });

  deleteDocument = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.service.deleteDocument(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Documento não encontrado' });
    }
    return res.json({ success: true, message: 'Documento excluído com sucesso' });
  });
} 