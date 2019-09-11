import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

const typeOrmCli: TypeOrmModuleOptions = {
  ...typeOrmConfig,
  name: 'seed',
  migrationsTableName: 'seeds',
  migrations: ['apps/api/src/database/seeds/*.ts'],
  cli: {
    migrationsDir: 'apps/api/src/database/seeds',
  },
};

module.exports = typeOrmCli;
