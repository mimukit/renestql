import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const PORT = environment.server.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(
    `Server started at: ${
      environment.production
        ? `PORT ${PORT}`
        : `http://localhost:${PORT}/graphql`
    }`,
    'Bootstrap'
  );
}
bootstrap();
