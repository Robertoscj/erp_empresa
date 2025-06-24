import { Request, Response } from 'express';
import { ProfitabilityAnalysisService } from '../services/profitability-analysis.service';
import { asyncHandler } from '../../../shared/middlewares/error.middleware';

export class ProfitabilityAnalysisController {
  private service: ProfitabilityAnalysisService;

  constructor() {
    this.service = new ProfitabilityAnalysisService();
  }

  createAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const analysis = await this.service.createAnalysis(data);
    return res.status(201).json({ success: true, data: analysis });
  });

  getAnalysisById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const analysis = await this.service.getAnalysisById(id);
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Análise não encontrada' });
    }
    return res.json({ success: true, data: analysis });
  });

  getAllAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      type: req.query.type as any,
      referenceId: req.query.referenceId as string,
      referenceName: req.query.referenceName as string,
      startDate: req.query.startDate as any,
      endDate: req.query.endDate as any,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };
    const result = await this.service.getAllAnalysis(filters);
    return res.json({
      success: true,
      data: result.analysis,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const analysis = await this.service.updateAnalysis(id, updateData);
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Análise não encontrada' });
    }
    return res.json({ success: true, data: analysis });
  });

  deleteAnalysis = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.service.deleteAnalysis(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Análise não encontrada' });
    }
    return res.json({ success: true, message: 'Análise excluída com sucesso' });
  });
} 