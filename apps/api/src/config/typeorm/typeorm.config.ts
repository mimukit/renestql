import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 32771,
  username: 'root',
  password: 'root',
  database: 'nestdb',
  entities: [process.cwd() + '/apps/api/src/app/**/**.entity.ts'],
  synchronize: false,
  logging: true,
};
