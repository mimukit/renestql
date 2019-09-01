import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  envName: 'dev',

  env: {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug',
  },

  server: {
    domainUrl: 'http://localhost',
    port: 4000,
  },

  database: {
    host: '127.0.0.1',
    port: 32771,
    database: 'nestdb',
    username: 'root',
    password: 'root',
    logging: true,
    synchronize: true,
    retryAttempts: 3,
  },

  auth: {
    secretKey: 'supersecretkey',
  },
};
