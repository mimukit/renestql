import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,

  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
    GRAPHQL_DEPTH_LIMIT: process.env.GRAPHQL_DEPTH_LIMIT || '5',
    GRAPHQL_QUERY_COST_LIMIT: process.env.GRAPHQL_QUERY_COST_LIMIT || '1000',
  },

  server: {
    domainUrl: process.env.DOMAIN_URL,
    port: 8080,
  },

  database: {
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT as any,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    logging: false,
    synchronize: false,
    dropSchema: false,
    retryAttempts: 3,
  },

  auth: {
    secretKey: process.env.SECRET_KEY,
    tokenExpiresIn: '15m',
  },

  debug: {
    printErrorStack: false,
    printRawError: false,
  },
};
