import {
  Table,
  Column,
  DataType,
  HasMany,
  Index
} from 'sequelize-typescript';
import { BaseEntity } from '@/shared/entities/base.entity';

export enum ClientType {
  INDIVIDUAL = 'individual',
  CORPORATE = 'corporate'
}

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

@Table({
  tableName: 'clients',
  paranoid: true,
  timestamps: true
})
export class Client extends BaseEntity<Client> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.ENUM(...Object.values(ClientType)),
    defaultValue: ClientType.INDIVIDUAL
  })
  type!: ClientType;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true
  })
  cpfCnpj?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  zipCode?: string;

  @Column({
    type: DataType.ENUM(...Object.values(ClientStatus)),
    defaultValue: ClientStatus.ACTIVE
  })
  status!: ClientStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  birthDate?: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  creditLimit!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0
  })
  currentBalance!: number;
} 