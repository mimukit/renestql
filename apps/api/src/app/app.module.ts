import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { graphqlConfig } from '../config/graphql/graphql.config';
import { typeOrmConfig } from '../config/typeorm/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // Database ORM Module (TypeORM)
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    }),

    // Grpahql Server Module
    GraphQLModule.forRoot(graphqlConfig),

    // Application Modules
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
