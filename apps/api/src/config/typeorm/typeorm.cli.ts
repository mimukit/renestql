import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

const typeOrmCli: TypeOrmModuleOptions = {
  ...typeOrmConfig,
  migrationsTableName: 'migrations',
  migrations: ['apps/api/src/database/migration/*.ts'],
  cli: {
    migrationsDir: 'apps/api/src/database/migration',
  },
};

module.exports = typeOrmCli;
