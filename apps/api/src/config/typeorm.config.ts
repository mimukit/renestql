import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 32771,
  username: 'root',
  password: 'root',
  database: 'nestdb',
  entities: [join(__dirname, '../app/**/**.entity.ts')],
  synchronize: false,
  logging: true,
};
