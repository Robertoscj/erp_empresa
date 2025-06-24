import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Index
} from 'sequelize-typescript';
import { BaseEntity } from '@/shared/entities/base.entity';
import { Product } from './product.model';

export enum MovementType {
  ENTRY = 'entry',
  EXIT = 'exit',
  ADJUSTMENT = 'adjustment',
  TRANSFER = 'transfer'
}

export enum MovementReason {
  PURCHASE = 'purchase',
  SALE = 'sale',
  RETURN = 'return',
  DAMAGED = 'damaged',
  EXPIRED = 'expired',
  ADJUSTMENT = 'adjustment',
  TRANSFER_IN = 'transfer_in',
  TRANSFER_OUT = 'transfer_out'
}

@Table({
  tableName: 'stock_movements',
  paranoid: true,
  timestamps: true
})
export class StockMovement extends BaseEntity<StockMovement> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  productId!: string;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.ENUM(...Object.values(MovementType)),
    allowNull: false
  })
  type!: MovementType;

  @Column({
    type: DataType.ENUM(...Object.values(MovementReason)),
    allowNull: false
  })
  reason!: MovementReason;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  unitCost!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalCost!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  previousStock!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  currentStock!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  lotNumber?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  expirationDate?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  documentNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  supplierName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  customerName?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes?: string;

  @Index
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  movementDate!: Date;
} 