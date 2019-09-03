import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { graphqlConfig } from '../config/graphql/graphql.config';
import { typeOrmConfig } from '../config/typeorm/typeorm.config';
import { PerformanceLoggingInterceptor } from './interceptors/performanceLogging.interceptor';
import { AuthModule } from './modules/auth/auth.module';
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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceLoggingInterceptor,
    },
  ],
})
export class AppModule {}
