import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaConfig } from './prisma/prisma.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  PrismaConfig.LoggerInstance({
    query: true,
    error: true,
    warn: true,
    info: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters();
  await app.listen(3000);
}
bootstrap();
