/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { ExceptionMiddleware } from './core/middleware';
import { checkConfigService } from './core/service/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // set using compression
  app.use(
    compression({
      threshold: 512,
    })
  );

  // add api prefix
  app.setGlobalPrefix('api/v1');

  // validate env global
  checkConfigService();

  if (process.env.NODE_ENV !== 'production') {
    // swagger documentation
    const config = new DocumentBuilder()
      .setTitle('APP API')
      .setDescription('APP API documentation')
      .setVersion('1.0')
      .addTag('PT Equity Life Indonesia')
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ExceptionMiddleware());

  const server = await app.listen(process.env.APP_PORT);
  server.setTimeout(600000); // set default timeout 10 minutes
}

bootstrap();
