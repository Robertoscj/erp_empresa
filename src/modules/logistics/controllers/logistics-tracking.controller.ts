import { Request, Response } from 'express';
import { LogisticsTrackingService } from '../services/logistics-tracking.service';
import { asyncHandler } from '../../../shared/middlewares/error.middleware';

export class LogisticsTrackingController {
  private service: LogisticsTrackingService;

  constructor() {
    this.service = new LogisticsTrackingService();
  }

  createTracking = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const tracking = await this.service.createTracking(data);
    return res.status(201).json({ success: true, data: tracking });
  });

  getTrackingById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const tracking = await this.service.getTrackingById(id);
    if (!tracking) {
      return res.status(404).json({ success: false, message: 'Rastreamento não encontrado' });
    }
    return res.json({ success: true, data: tracking });
  });

  getAllTracking = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      status: req.query.status as any,
      trackingNumber: req.query.trackingNumber as string,
      lotNumber: req.query.lotNumber as string,
      productName: req.query.productName as string,
      supplierName: req.query.supplierName as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };
    const result = await this.service.getAllTracking(filters);
    return res.json({
      success: true,
      data: result.tracking,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateTracking = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const tracking = await this.service.updateTracking(id, updateData);
    if (!tracking) {
      return res.status(404).json({ success: false, message: 'Rastreamento não encontrado' });
    }
    return res.json({ success: true, data: tracking });
  });

  deleteTracking = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.service.deleteTracking(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Rastreamento não encontrado' });
    }
    return res.json({ success: true, message: 'Rastreamento excluído com sucesso' });
  });
} 