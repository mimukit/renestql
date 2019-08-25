import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.info(`Server started at: http://localhost:${PORT}/graphql`);
}
bootstrap();
