import { LogisticsTrackingRepository, LogisticsTrackingFilters, LogisticsTrackingSearchResult } from '../repositories/logistics-tracking.repository';
import { LogisticsTracking } from '../entities/logistics-tracking.model';

export class LogisticsTrackingService {
  private repository: LogisticsTrackingRepository;

  constructor() {
    this.repository = new LogisticsTrackingRepository();
  }

  async createTracking(data: Partial<LogisticsTracking>): Promise<LogisticsTracking> {
    if (data.trackingNumber) {
      const existing = await this.repository.findByTrackingNumber(data.trackingNumber);
      if (existing) throw new Error('Número de rastreamento já cadastrado');
    }
    return await this.repository.create(data);
  }

  async getTrackingById(id: string): Promise<LogisticsTracking | null> {
    return await this.repository.findById(id);
  }

  async getAllTracking(filters: LogisticsTrackingFilters): Promise<LogisticsTrackingSearchResult> {
    return await this.repository.findAll(filters);
  }

  async updateTracking(id: string, data: Partial<LogisticsTracking>): Promise<LogisticsTracking | null> {
    return await this.repository.update(id, data);
  }

  async deleteTracking(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
} 