import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';
import { BaseEntity } from '../../../shared/entities/base.entity';

export interface BankIntegrationAttributes {
  id: string;
  bankName: string;
  integrationType: 'api' | 'file' | 'manual';
  apiEndpoint?: string;
  apiKey?: string;
  apiSecret?: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'investment';
  isActive: boolean;
  lastSyncDate?: Date;
  syncFrequency: 'daily' | 'weekly' | 'monthly';
  notes?: string;
  active: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface BankIntegrationCreationAttributes extends Omit<BankIntegrationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class BankIntegration extends BaseEntity<BankIntegrationAttributes> implements BankIntegrationAttributes {
  public override id!: string;
  public bankName!: string;
  public integrationType!: 'api' | 'file' | 'manual';
  public apiEndpoint?: string;
  public apiKey?: string;
  public apiSecret?: string;
  public accountNumber!: string;
  public accountType!: 'checking' | 'savings' | 'investment';
  public isActive!: boolean;
  public lastSyncDate?: Date;
  public syncFrequency!: 'daily' | 'weekly' | 'monthly';
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

BankIntegration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bankName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    integrationType: {
      type: DataTypes.ENUM('api', 'file', 'manual'),
      allowNull: false,
    },
    apiEndpoint: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    apiKey: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    apiSecret: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    accountType: {
      type: DataTypes.ENUM('checking', 'savings', 'investment'),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    lastSyncDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    syncFrequency: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
      allowNull: false,
      defaultValue: 'daily',
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
    tableName: 'bank_integrations',
    modelName: 'BankIntegration',
  }
);

export default BankIntegration; 