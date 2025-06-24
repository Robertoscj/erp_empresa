import {
  Table,
  Column,
  DataType,
  HasMany,
  BeforeCreate,
  BeforeUpdate
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { BaseEntity } from './base.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  OPERATOR = 'operator',
  VIEWER = 'viewer'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

@Table({
  tableName: 'users',
  paranoid: true,
  timestamps: true
})
export class User extends BaseEntity<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.OPERATOR
  })
  role!: UserRole;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.ACTIVE
  })
  status!: UserStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  avatar?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  lastLoginAt?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  refreshToken?: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed && instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  override toJSON() {
    const values: any = { ...this.get() };
    if (values.password) delete values.password;
    if (values.refreshToken) delete values.refreshToken;
    return values;
  }
} 