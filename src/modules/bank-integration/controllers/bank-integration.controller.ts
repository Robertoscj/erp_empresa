import { Request, Response } from 'express';
import { BankIntegrationService } from '../services/bank-integration.service';
import { asyncHandler } from '@/shared/middlewares/error.middleware';

export class BankIntegrationController {
  private service: BankIntegrationService;

  constructor() {
    this.service = new BankIntegrationService();
  }

  createIntegration = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const integration = await this.service.createIntegration(data);
    return res.status(201).json({ success: true, data: integration });
  });

  getIntegrationById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const integration = await this.service.getIntegrationById(id);
    if (!integration) {
      return res.status(404).json({ success: false, message: 'Integração não encontrada' });
    }
    return res.json({ success: true, data: integration });
  });

  getAllIntegrations = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      type: req.query.type as any,
      status: req.query.status as any,
      transactionId: req.query.transactionId as string,
      bankName: req.query.bankName as string,
      payerName: req.query.payerName as string,
      payerDocument: req.query.payerDocument as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };
    const result = await this.service.getAllIntegrations(filters);
    return res.json({
      success: true,
      data: result.integrations,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateIntegration = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const integration = await this.service.updateIntegration(id, updateData);
    if (!integration) {
      return res.status(404).json({ success: false, message: 'Integração não encontrada' });
    }
    return res.json({ success: true, data: integration });
  });

  deleteIntegration = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.service.deleteIntegration(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Integração não encontrada' });
    }
    return res.json({ success: true, message: 'Integração excluída com sucesso' });
  });
} 