import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 32771,
  username: 'root',
  password: 'root',
  database: 'nestdb',
  entities: [process.cwd() + '/apps/api/src/app/**/**.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['apps/api/src/migration/*.ts'],
  cli: {
    migrationsDir: 'apps/api/src/migration',
  },
  synchronize: false,
  logging: true,
};

module.exports = typeOrmConfig;
