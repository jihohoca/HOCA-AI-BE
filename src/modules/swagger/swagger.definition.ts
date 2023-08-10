import config from '../../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HOCA-CHATGPT',
    version: '0.0.1',
    description: 'HOCA-CHATGPT',
    license: {
      name: 'MIT',
      url: 'https://github.com/jihohoca/HOCA-AI-BE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server',
    },
  ],
};

export default swaggerDefinition;
