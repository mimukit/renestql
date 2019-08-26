import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(
    `Server started at: http://localhost:${PORT}/graphql`,
    'Bootstrap'
  );
}
bootstrap();
