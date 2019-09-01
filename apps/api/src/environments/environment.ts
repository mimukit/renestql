import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  envName: 'dev',

  env: {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug',
  },

  server: {
    domainUrl: 'http://localhost:4000',
    port: 4000,
    globalPrefix: '/graphql',
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
