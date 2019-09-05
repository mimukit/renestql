import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';
import { httpLogger } from './app/middlewares/httpLogger.middleware';
import { setRequestId } from './app/middlewares/setRequestId.middleware';
import { environment } from './environments/environment';

const PORT = environment.server.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup security middlewares
  app.use(helmet());

  app.enableCors();

  // Setup logger middleware

  app.use(bodyParser.json());

  app.use(setRequestId);

  app.use(httpLogger);

  // Start app
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
