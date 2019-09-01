import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '../../environments/environment';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql' as any,
  entities: [process.cwd() + '/apps/api/src/app/**/**.entity.ts'],
  ...environment.database,
};
