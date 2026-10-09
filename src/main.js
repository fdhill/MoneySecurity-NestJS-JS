import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { loggerMiddleware } from './common/middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(loggerMiddleware);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MoneySecurity API')
    .setDescription('Backend MoneySecurity — NestJS + Prisma')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`\n✓ MoneySecurity API: http://localhost:${port}/api`);
  console.log(`✓ Swagger docs: http://localhost:${port}/api/docs`);
}
