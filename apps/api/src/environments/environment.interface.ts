import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * environment variables that goes into process.env
 */
export interface Env {
  NODE_ENV: string;
  GRAPHQL_DEPTH_LIMIT: string;
  GRAPHQL_QUERY_COST_LIMIT: string;
}

/**
 * Server Environment
 */
export interface IEnvironment {
  production: boolean;

  env?: Env;

  server: {
    domainUrl: string;
    port: number;
  };

  database: TypeOrmModuleOptions;

  auth: {
    secretKey: string;
    tokenExpiresIn: string; // Eg: '60s', '15m', '10h', '2 days', '7d' [more info: zeit/ms](https://github.com/zeit/ms.js)
  };

  debug: {
    printErrorStack: boolean;
    printRawError: boolean;
  };
}
