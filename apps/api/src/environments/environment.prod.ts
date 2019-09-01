import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  envName: 'production',

  env: {
    NODE_ENV: 'production',
    LOG_LEVEL: 'info',
  },

  server: {
    domainUrl: 'https://api.shorol.io',
    port: 8080,
    globalPrefix: '/graphql',
  },

  database: {
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT as any,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    logging: false,
    synchronize: false,
    retryAttempts: 3,
  },

  auth: {
    secretKey: process.env.SECRET_KEY,
  },
};
