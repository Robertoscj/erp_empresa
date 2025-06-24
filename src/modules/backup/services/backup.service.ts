import AWS from 'aws-sdk';
import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from '../../../config/app';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export interface BackupConfig {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
  bucket: string;
  region: string;
}

export interface BackupResult {
  success: boolean;
  fileName?: string;
  fileSize?: number;
  error?: string;
  uploadedToS3?: boolean;
}

export class BackupService {
  private s3: AWS.S3;
  private backupConfig: BackupConfig;

  constructor() {
    this.backupConfig = {
      database: process.env.DB_NAME || 'erp_empresarial',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '5432',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      bucket: config.aws.s3Bucket || 'erp-backups',
      region: config.aws.region || 'us-east-1'
    };

    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
      region: this.backupConfig.region
    });
  }

  async createBackup(): Promise<BackupResult> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `backup-${this.backupConfig.database}-${timestamp}.sql`;
      const filePath = path.join(process.cwd(), 'backups', fileName);

      // Criar diretório de backup se não existir
      const backupDir = path.dirname(filePath);
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      // Comando pg_dump
      const pgDumpCommand = `PGPASSWORD="${this.backupConfig.password}" pg_dump -h ${this.backupConfig.host} -p ${this.backupConfig.port} -U ${this.backupConfig.username} -d ${this.backupConfig.database} -f "${filePath}"`;

      await execAsync(pgDumpCommand);

      // Verificar se o arquivo foi criado
      if (!fs.existsSync(filePath)) {
        throw new Error('Falha ao criar arquivo de backup');
      }

      const stats = fs.statSync(filePath);
      const fileSize = stats.size;

      // Upload para S3
      const uploadedToS3 = await this.uploadToS3(filePath, fileName);

      return {
        success: true,
        fileName,
        fileSize,
        uploadedToS3
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  private async uploadToS3(filePath: string, fileName: string): Promise<boolean> {
    try {
      const fileContent = fs.readFileSync(filePath);
      
      const uploadParams = {
        Bucket: this.backupConfig.bucket,
        Key: `backups/${fileName}`,
        Body: fileContent,
        ContentType: 'application/sql'
      };

      await this.s3.upload(uploadParams).promise();

      // Remover arquivo local após upload
      fs.unlinkSync(filePath);

      return true;
    } catch (error) {
      console.error('Erro ao fazer upload para S3:', error);
      return false;
    }
  }

  async restoreBackup(fileName: string): Promise<BackupResult> {
    try {
      const localFilePath = path.join(process.cwd(), 'backups', fileName);
      const backupDir = path.dirname(localFilePath);

      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      // Download do S3
      const downloadParams = {
        Bucket: this.backupConfig.bucket,
        Key: `backups/${fileName}`
      };

      const { Body } = await this.s3.getObject(downloadParams).promise();
      
      if (!Body) {
        throw new Error('Arquivo não encontrado no S3');
      }
      const safeBody = Body as Buffer | string | Uint8Array | NodeJS.ReadableStream;

      let fileBuffer: Buffer;
      if (Buffer.isBuffer(safeBody)) {
        fileBuffer = safeBody;
      } else if (typeof safeBody === 'string') {
        fileBuffer = Buffer.from(safeBody);
      } else if (safeBody instanceof Uint8Array) {
        fileBuffer = Buffer.from(safeBody);
      } else if (typeof (safeBody as any).transformToByteArray === 'function') {
        fileBuffer = Buffer.from((safeBody as any).transformToByteArray());
      } else if (typeof (safeBody as any).read === 'function') {
        // Node.js Readable stream
        const chunks: Buffer[] = [];
        for await (const chunk of safeBody as any) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        fileBuffer = Buffer.concat(chunks);
      } else {
        throw new Error('Formato de Body não suportado');
      }

      fs.writeFileSync(localFilePath, fileBuffer);

      // Comando de restore
      const restoreCommand = `PGPASSWORD="${this.backupConfig.password}" psql -h ${this.backupConfig.host} -p ${this.backupConfig.port} -U ${this.backupConfig.username} -d ${this.backupConfig.database} -f "${localFilePath}"`;

      await execAsync(restoreCommand);

      // Remover arquivo local
      fs.unlinkSync(localFilePath);

      return {
        success: true,
        fileName
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  async listBackups(): Promise<string[]> {
    try {
      const params = {
        Bucket: this.backupConfig.bucket,
        Prefix: 'backups/'
      };

      const { Contents } = await this.s3.listObjectsV2(params).promise();
      
      if (!Contents) {
        return [];
      }

      return Contents
        .map(obj => obj.Key?.replace('backups/', ''))
        .filter(Boolean) as string[];
    } catch (error) {
      console.error('Erro ao listar backups:', error);
      return [];
    }
  }

  async deleteBackup(fileName: string): Promise<boolean> {
    try {
      const params = {
        Bucket: this.backupConfig.bucket,
        Key: `backups/${fileName}`
      };

      await this.s3.deleteObject(params).promise();
      return true;
    } catch (error) {
      console.error('Erro ao deletar backup:', error);
      return false;
    }
  }

  async cleanupOldBackups(retentionDays: number = 30): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      const backups = await this.listBackups();
      let deletedCount = 0;

      for (const backup of backups) {
        const backupDate = this.extractDateFromFileName(backup);
        if (backupDate && backupDate < cutoffDate) {
          await this.deleteBackup(backup);
          deletedCount++;
        }
      }

      return deletedCount;
    } catch (error) {
      console.error('Erro ao limpar backups antigos:', error);
      return 0;
    }
  }

  private extractDateFromFileName(fileName: string): Date | null {
    try {
      const match = fileName.match(/backup-.*-(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z)\.sql/);
      if (match) {
        const dateStr = match[1].replace(/-/g, ':').replace('T', ' ').replace('Z', '');
        return new Date(dateStr);
      }
      return null;
    } catch {
      return null;
    }
  }
} 