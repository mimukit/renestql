import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';
import { typeOrmConfig } from '../config/typeorm/typeorm.config';
import { environment } from '../environments/environment';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // Database ORM Module (TypeORM)
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    }),

    // Grpahql Server Module
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './apps/api/src/app/graphql.types.ts'),
        outputAs: 'class',
      },
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
    }),

    // Application Modules
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
