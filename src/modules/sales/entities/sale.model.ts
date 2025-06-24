import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Index
} from 'sequelize-typescript';
import { BaseEntity } from '@/shared/entities/base.entity';
import { Client } from '@/modules/clients/entities/client.model';

export enum SaleStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
  RETURNED = 'returned'
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  BANK_TRANSFER = 'bank_transfer',
  CHECK = 'check',
  CREDIT = 'credit'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  OVERDUE = 'overdue'
}

@Table({
  tableName: 'sales',
  paranoid: true,
  timestamps: true
})
export class Sale extends BaseEntity<Sale> {
  @ForeignKey(() => Client)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  clientId!: string;

  @BelongsTo(() => Client)
  client!: Client;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  saleNumber!: string;

  @Column({
    type: DataType.ENUM(...Object.values(SaleStatus)),
    defaultValue: SaleStatus.PENDING
  })
  status!: SaleStatus;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false
  })
  paymentMethod!: PaymentMethod;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    defaultValue: PaymentStatus.PENDING
  })
  paymentStatus!: PaymentStatus;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  subtotal!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  discount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  tax!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  total!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  paidAmount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  remainingAmount!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  saleDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  dueDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  deliveryDate?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  deliveryAddress?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  notes?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  invoiceNumber?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isDelivered!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isInvoiced!: boolean;
} 