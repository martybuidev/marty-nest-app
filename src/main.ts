import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import compression from 'compression';
import helmet from 'helmet';
import qs from 'qs';

import { AppModule } from '@/app.module';
import { ConfigService } from '@/config/config.service';

import { AllExceptionsFilter } from './common/filter';
import { LoggingInterceptor, TransformInterceptor } from './common/interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.cors.origin,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'x-request-id'],
  });

  app.use(helmet());
  app.use(compression());

  app.setGlobalPrefix('api');

  app.set('query parser', (query: string) => {
    const parsed = qs.parse(query);

    for (const param of Object.keys(parsed)) {
      if (parsed[param] === '') {
        delete parsed[param];
      }
    }

    return parsed;
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Marty Nest App API')
    .setDescription('API documentation for Marty Nest Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.app.port);
}
void bootstrap();
