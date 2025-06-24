import { ProfitabilityAnalysisRepository, ProfitabilityAnalysisFilters, ProfitabilityAnalysisSearchResult } from '../repositories/profitability-analysis.repository';
import { ProfitabilityAnalysis } from '../entities/profitability-analysis.model';

export class ProfitabilityAnalysisService {
  private repository: ProfitabilityAnalysisRepository;

  constructor() {
    this.repository = new ProfitabilityAnalysisRepository();
  }

  async createAnalysis(data: Partial<ProfitabilityAnalysis>): Promise<ProfitabilityAnalysis> {
    return await this.repository.create(data);
  }

  async getAnalysisById(id: string): Promise<ProfitabilityAnalysis | null> {
    return await this.repository.findById(id);
  }

  async getAllAnalysis(filters: ProfitabilityAnalysisFilters): Promise<ProfitabilityAnalysisSearchResult> {
    return await this.repository.findAll(filters);
  }

  async updateAnalysis(id: string, data: Partial<ProfitabilityAnalysis>): Promise<ProfitabilityAnalysis | null> {
    return await this.repository.update(id, data);
  }

  async deleteAnalysis(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
} 