import { Request, Response } from 'express';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { AuthRequest } from '../../../shared/middlewares/auth.middleware';
import { asyncHandler } from '../../../shared/middlewares/error.middleware';

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  createClient = asyncHandler(async (req: AuthRequest, res: Response) => {
    const clientData: CreateClientDto = req.body;
    const userId = req.user?.id || '';

    const client = await this.clientService.createClient(clientData, userId);

    return res.status(201).json({
      success: true,
      data: client
    });
  });

  getClientById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const client = await this.clientService.getClientById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }
    return res.json({
      success: true,
      data: client
    });
  });

  getAllClients = asyncHandler(async (req: Request, res: Response) => {
    const filters = {
      name: req.query.name as string,
      type: req.query.type as any,
      status: req.query.status as any,
      email: req.query.email as string,
      cpfCnpj: req.query.cpfCnpj as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };

    const result = await this.clientService.getAllClients(filters);

    return res.json({
      success: true,
      data: result.clients,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: filters.limit
      }
    });
  });

  updateClient = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const updateData = req.body;
    const userId = req.user?.id || '';

    const client = await this.clientService.updateClient(id, updateData, userId);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    return res.json({
      success: true,
      data: client
    });
  });

  deleteClient = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const deleted = await this.clientService.deleteClient(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }
    return res.json({
      success: true,
      message: 'Cliente excluído com sucesso'
    });
  });

  getActiveClients = asyncHandler(async (req: Request, res: Response) => {
    const clients = await this.clientService.getActiveClients();
    return res.json({
      success: true,
      data: clients
    });
  });

  getClientStatistics = asyncHandler(async (req: Request, res: Response) => {
    const statistics = await this.clientService.getClientStatistics();
    return res.json({
      success: true,
      data: statistics
    });
  });

  updateClientBalance = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
    const { amount } = req.body;
    if (typeof amount !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Valor deve ser um número'
      });
    }
    const client = await this.clientService.updateClientBalance(id, amount);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }
    return res.json({
      success: true,
      data: client
    });
  });
} 