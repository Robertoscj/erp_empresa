import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';
import { BaseEntity } from '../../../shared/entities/base.entity';

export interface ProfitabilityAnalysisAttributes {
  id: string;
  analysisPeriod: string;
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  grossProfitMargin: number;
  operatingExpenses: number;
  operatingProfit: number;
  operatingProfitMargin: number;
  netProfit: number;
  netProfitMargin: number;
  analysisDate: Date;
  notes?: string;
  active: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProfitabilityAnalysisCreationAttributes extends Omit<ProfitabilityAnalysisAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class ProfitabilityAnalysis extends BaseEntity<ProfitabilityAnalysisAttributes> implements ProfitabilityAnalysisAttributes {
  public override id!: string;
  public analysisPeriod!: string;
  public totalRevenue!: number;
  public totalCosts!: number;
  public grossProfit!: number;
  public grossProfitMargin!: number;
  public operatingExpenses!: number;
  public operatingProfit!: number;
  public operatingProfitMargin!: number;
  public netProfit!: number;
  public netProfitMargin!: number;
  public analysisDate!: Date;
  public notes?: string;
  public override active!: boolean;
  public override createdBy?: string;
  public override updatedBy?: string;
  public override readonly createdAt!: Date;
  public override readonly updatedAt!: Date;
  public override readonly deletedAt?: Date;

  static associate(models: any) {
    // Define associations here
  }
}

ProfitabilityAnalysis.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    analysisPeriod: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    totalRevenue: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalCosts: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    grossProfit: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    grossProfitMargin: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
    operatingExpenses: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    operatingProfit: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    operatingProfitMargin: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
    netProfit: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    netProfitMargin: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
    analysisDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'profitability_analysis',
    modelName: 'ProfitabilityAnalysis',
  }
);

export default ProfitabilityAnalysis; 