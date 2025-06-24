import { Request, Response } from 'express';
import { FinancialAccountService } from '../services/financial-account.service';
import { asyncHandler } from '../../../shared/middlewares/error.middleware';

export class FinancialAccountController {
  private service: FinancialAccountService;

  constructor() {
    this.service = new FinancialAccountService();
  }

  createAccount = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const account = await this.service.createAccount(data);
    return res.status(201).json({ success: true, data: account });
  });

  getAccountById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const account = await this.service.getAccountById(id);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Conta não encontrada' });
    }
    return res.json({ success: true, data: account });
  });

  getAllAccounts = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      type: req.query.type as any,
      status: req.query.status as any,
      category: req.query.category as string,
      costCenter: req.query.costCenter as string,
      payerName: req.query.payerName as string,
      receiverName: req.query.receiverName as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };
    const result = await this.service.getAllAccounts(filters);
    return res.json({
      success: true,
      data: result.accounts,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const account = await this.service.updateAccount(id, updateData);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Conta não encontrada' });
    }
    return res.json({ success: true, data: account });
  });

  deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.service.deleteAccount(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Conta não encontrada' });
    }
    return res.json({ success: true, message: 'Conta excluída com sucesso' });
  });
} 