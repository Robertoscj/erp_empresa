import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';
import { BaseEntity } from '../../../shared/entities/base.entity';

export interface LogisticsTrackingAttributes {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'returned' | 'lost';
  originAddress: string;
  destinationAddress: string;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  carrierName: string;
  carrierTrackingCode?: string;
  weight: number;
  dimensions: string;
  notes?: string;
  active: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface LogisticsTrackingCreationAttributes extends Omit<LogisticsTrackingAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class LogisticsTracking extends BaseEntity<LogisticsTrackingAttributes> implements LogisticsTrackingAttributes {
  public override id!: string;
  public trackingNumber!: string;
  public status!: 'pending' | 'in_transit' | 'delivered' | 'returned' | 'lost';
  public originAddress!: string;
  public destinationAddress!: string;
  public estimatedDeliveryDate!: Date;
  public actualDeliveryDate?: Date;
  public carrierName!: string;
  public carrierTrackingCode?: string;
  public weight!: number;
  public dimensions!: string;
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

LogisticsTracking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    trackingNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_transit', 'delivered', 'returned', 'lost'),
      allowNull: false,
      defaultValue: 'pending',
    },
    originAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    destinationAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estimatedDeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    actualDeliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    carrierName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    carrierTrackingCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dimensions: {
      type: DataTypes.STRING(50),
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
    tableName: 'logistics_tracking',
    modelName: 'LogisticsTracking',
  }
);

export default LogisticsTracking; 