import {
  Table,
  Column,
  DataType,
  HasMany,
  Index
} from 'sequelize-typescript';
import { BaseEntity } from '@/shared/entities/base.entity';

export enum ProductCategory {
  ELETRONICOS = 'eletronicos',
  VESTUARIO = 'vestuario',
  ALIMENTOS = 'alimentos',
  BEBIDAS = 'bebidas',
  LIMPEZA = 'limpeza',
  OUTROS = 'outros'
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued'
}

@Table({
  tableName: 'products',
  paranoid: true,
  timestamps: true
})
export class Product extends BaseEntity<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  description?: string;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  sku!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  barcode?: string;

  @Column({
    type: DataType.ENUM(...Object.values(ProductCategory)),
    defaultValue: ProductCategory.OUTROS
  })
  category!: ProductCategory;

  @Column({
    type: DataType.ENUM(...Object.values(ProductStatus)),
    defaultValue: ProductStatus.ACTIVE
  })
  status!: ProductStatus;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  costPrice!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  salePrice!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  currentStock!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  minimumStock!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  maximumStock!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  unit?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  brand?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  model?: string;

  @Column({
    type: DataType.DECIMAL(5, 2),
    defaultValue: 0
  })
  weight?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  width?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  height?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  depth?: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  requiresLotControl!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  requiresExpirationControl!: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  expirationDays?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes?: string;
} 