import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsNumber, Min, MaxLength } from 'class-validator';
import { ClientType, ClientStatus } from '../entities/client.model';

export class CreateClientDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsEnum(ClientType)
  @IsOptional()
  type?: ClientType;

  @IsString()
  @IsOptional()
  @MaxLength(18)
  cpfCnpj?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2)
  state?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  zipCode?: string;

  @IsEnum(ClientStatus)
  @IsOptional()
  status?: ClientStatus;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  creditLimit?: number;
} 