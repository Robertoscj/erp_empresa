import { Request, Response } from 'express';
import { AccountingXmlService } from '../services/accounting-xml.service';
import { asyncHandler } from '@/shared/middlewares/error.middleware';

export class AccountingXmlController {
  private service: AccountingXmlService;

  constructor() {
    this.service = new AccountingXmlService();
  }

  importXml = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const xml = await this.service.importXml(data);
    return res.status(201).json({ success: true, data: xml });
  });

  getXmlById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const xml = await this.service.getXmlById(id);
    if (!xml) {
      return res.status(404).json({ success: false, message: 'XML não encontrado' });
    }
    return res.json({ success: true, data: xml });
  });

  getAllXmls = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      status: req.query.status as any,
      accessKey: req.query.accessKey as string,
      issuerCnpj: req.query.issuerCnpj as string,
      recipientCnpj: req.query.recipientCnpj as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };
    const result = await this.service.getAllXmls(filters);
    return res.json({
      success: true,
      data: result.xmls,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateXml = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const xml = await this.service.updateXml(id, updateData);
    if (!xml) {
      return res.status(404).json({ success: false, message: 'XML não encontrado' });
    }
    return res.json({ success: true, data: xml });
  });

  deleteXml = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.service.deleteXml(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'XML não encontrado' });
    }
    return res.json({ success: true, message: 'XML excluído com sucesso' });
  });
} 