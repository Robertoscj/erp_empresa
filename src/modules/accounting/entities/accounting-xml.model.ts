import {
  Table,
  Column,
  DataType,
  Index
} from 'sequelize-typescript';
import { BaseEntity } from '@/shared/entities/base.entity';

export enum AccountingXmlStatus {
  IMPORTED = 'imported',
  VALIDATED = 'validated',
  INVALID = 'invalid',
  ERROR = 'error'
}

@Table({
  tableName: 'accounting_xmls',
  paranoid: true,
  timestamps: true
})
export class AccountingXml extends BaseEntity<AccountingXml> {
  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  accessKey!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  fileName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  issuerName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  issuerCnpj!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  recipientName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  recipientCnpj!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  issueDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalAmount!: number;

  @Column({
    type: DataType.ENUM(...Object.values(AccountingXmlStatus)),
    defaultValue: AccountingXmlStatus.IMPORTED
  })
  status!: AccountingXmlStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  xmlUrl?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  validationErrors?: string;
} 