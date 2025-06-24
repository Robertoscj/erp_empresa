import { ProfitabilityAnalysis } from '../entities/profitability-analysis.model';
import { Op, WhereOptions } from 'sequelize';

export interface ProfitabilityAnalysisFilters {
  type?: 'product' | 'client' | 'period';
  referenceId?: string;
  referenceName?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface ProfitabilityAnalysisSearchResult {
  analysis: ProfitabilityAnalysis[];
  total: number;
  page: number;
  totalPages: number;
}

export class ProfitabilityAnalysisRepository {
  async create(data: Partial<ProfitabilityAnalysis>): Promise<ProfitabilityAnalysis> {
    return await ProfitabilityAnalysis.create(data);
  }

  async findById(id: string): Promise<ProfitabilityAnalysis | null> {
    return await ProfitabilityAnalysis.findByPk(id);
  }

  async findAll(filters: ProfitabilityAnalysisFilters = {}): Promise<ProfitabilityAnalysisSearchResult> {
    const {
      type,
      referenceId,
      referenceName,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = filters;

    const where: WhereOptions = {};
    if (type) where.type = type;
    if (referenceId) where.referenceId = { [Op.iLike]: `%${referenceId}%` };
    if (referenceName) where.referenceName = { [Op.iLike]: `%${referenceName}%` };
    if (startDate && endDate) {
      where.startDate = { [Op.between]: [startDate, endDate] };
    }

    const offset = (page - 1) * limit;
    const { count, rows } = await ProfitabilityAnalysis.findAndCountAll({
      where,
      limit,
      offset,
      order: [['startDate', 'DESC']]
    });

    return {
      analysis: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  async update(id: string, data: Partial<ProfitabilityAnalysis>): Promise<ProfitabilityAnalysis | null> {
    const analysis = await ProfitabilityAnalysis.findByPk(id);
    if (!analysis) return null;
    await analysis.update(data);
    return analysis;
  }

  async delete(id: string): Promise<boolean> {
    const analysis = await ProfitabilityAnalysis.findByPk(id);
    if (!analysis) return false;
    await analysis.destroy();
    return true;
  }
} 