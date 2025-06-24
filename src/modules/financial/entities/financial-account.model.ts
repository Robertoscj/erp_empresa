import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';
import { BaseEntity } from '../../../shared/entities/base.entity';

export interface FinancialAccountAttributes {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'investment' | 'credit';
  balance: number;
  currency: string;
  bankName: string;
  branchCode: string;
  isActive: boolean;
  description?: string;
  active: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface FinancialAccountCreationAttributes extends Omit<FinancialAccountAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class FinancialAccount extends BaseEntity<FinancialAccountAttributes> implements FinancialAccountAttributes {
  public override id!: string;
  public accountNumber!: string;
  public accountType!: 'checking' | 'savings' | 'investment' | 'credit';
  public balance!: number;
  public currency!: string;
  public bankName!: string;
  public branchCode!: string;
  public isActive!: boolean;
  public description?: string;
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

FinancialAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    accountType: {
      type: DataTypes.ENUM('checking', 'savings', 'investment', 'credit'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'BRL',
    },
    bankName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    branchCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    description: {
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
    tableName: 'financial_accounts',
    modelName: 'FinancialAccount',
  }
);

export default FinancialAccount; 