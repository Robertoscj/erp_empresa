import { LogisticsTracking } from '../entities/logistics-tracking.model';
import { Op, WhereOptions } from 'sequelize';

export interface LogisticsTrackingFilters {
  status?: 'pending' | 'in_transit' | 'delivered' | 'returned' | 'lost';
  trackingNumber?: string;
  lotNumber?: string;
  productName?: string;
  supplierName?: string;
  page?: number;
  limit?: number;
}

export interface LogisticsTrackingSearchResult {
  tracking: LogisticsTracking[];
  total: number;
  page: number;
  totalPages: number;
}

export class LogisticsTrackingRepository {
  async create(data: Partial<LogisticsTracking>): Promise<LogisticsTracking> {
    return await LogisticsTracking.create(data);
  }

  async findById(id: string): Promise<LogisticsTracking | null> {
    return await LogisticsTracking.findByPk(id);
  }

  async findByTrackingNumber(trackingNumber: string): Promise<LogisticsTracking | null> {
    return await LogisticsTracking.findOne({ where: { trackingNumber } });
  }

  async findAll(filters: LogisticsTrackingFilters = {}): Promise<LogisticsTrackingSearchResult> {
    const {
      status,
      trackingNumber,
      lotNumber,
      productName,
      supplierName,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};
    if (status) where.status = status;
    if (trackingNumber) where.trackingNumber = { [Op.iLike]: `%${trackingNumber}%` };
    if (lotNumber) where.lotNumber = { [Op.iLike]: `%${lotNumber}%` };
    if (productName) where.productName = { [Op.iLike]: `%${productName}%` };
    if (supplierName) where.supplierName = { [Op.iLike]: `%${supplierName}%` };

    const offset = (page - 1) * limit;
    const { count, rows } = await LogisticsTracking.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      tracking: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<LogisticsTracking>): Promise<LogisticsTracking | null> {
    const track = await LogisticsTracking.findByPk(id);
    if (!track) return null;
    await track.update(data);
    return track;
  }

  async delete(id: string): Promise<boolean> {
    const track = await LogisticsTracking.findByPk(id);
    if (!track) return false;
    await track.destroy();
    return true;
  }
} 