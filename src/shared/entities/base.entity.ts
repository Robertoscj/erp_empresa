import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model
} from 'sequelize-typescript';

@Table({
  tableName: 'base_entity',
  paranoid: true,
  timestamps: true
})
export abstract class BaseEntity<T extends {} = any, T2 extends {} = any> extends Model<T, T2> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  override id!: string;

  @CreatedAt
  @Column(DataType.DATE)
  override createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  override updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  override deletedAt?: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  active!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  createdBy?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  updatedBy?: string;
} 