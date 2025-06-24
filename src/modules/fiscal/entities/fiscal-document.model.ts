import {
  Table,
  Column,
  DataType,
  Index
} from 'sequelize-typescript';
import { BaseEntity } from '@/shared/entities/base.entity';

export enum FiscalDocumentType {
  NFCE = 'nfce',
  CTE = 'cte',
  MDFE = 'mdfe',
  NFSE = 'nfse',
  NFE = 'nfe',
  SPED = 'sped'
}

export enum FiscalDocumentStatus {
  DRAFT = 'draft',
  ISSUED = 'issued',
  CANCELLED = 'cancelled',
  DENIED = 'denied',
  AUTHORIZED = 'authorized',
  REJECTED = 'rejected'
}

@Table({
  tableName: 'fiscal_documents',
  paranoid: true,
  timestamps: true
})
export class FiscalDocument extends BaseEntity<FiscalDocument> {
  @Column({
    type: DataType.ENUM(...Object.values(FiscalDocumentType)),
    allowNull: false
  })
  type!: FiscalDocumentType;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  documentNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  series!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  issueDate!: Date;

  @Column({
    type: DataType.ENUM(...Object.values(FiscalDocumentStatus)),
    defaultValue: FiscalDocumentStatus.DRAFT
  })
  status!: FiscalDocumentStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  accessKey?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  xmlUrl?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  pdfUrl?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  recipientName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  recipientDocument?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalAmount!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes?: string;
} 