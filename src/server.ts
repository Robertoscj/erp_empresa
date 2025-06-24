import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/config/swagger';
import routes from '@/routes/index';
import sequelize from '@/config/database';
import { errorHandler, notFoundHandler } from '@/shared/middlewares/error.middleware';
import { config } from '@/config/app';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rotas da API
app.use('/api', routes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Not found e error handler
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      // eslint-disable-next-line no-console
      console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
})(); 