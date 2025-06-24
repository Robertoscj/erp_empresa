import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ERP Empresarial API',
    version: '1.0.0',
    description: 'Documentação da API do ERP Empresarial',
  },
  servers: [
    {
      url: '/api',
      description: 'API Principal',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: [
    'src/modules/**/routes/*.ts',
    'src/modules/**/controllers/*.ts',
    'src/modules/**/entities/*.ts',
    'src/modules/**/dto/*.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec; 