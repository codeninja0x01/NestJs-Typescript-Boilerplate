import 'dotenv/config';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { isProdMode } from './app.environment';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';

let APP_CONFIG;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, isProdMode ? { logger: false } : undefined);
  APP_CONFIG = app.get('ConfigService');

  if (APP_CONFIG.get('SWAGGER_ENABLED') === 'true') {
    const swaggerFile = require(path.join(__dirname, '..', APP_CONFIG.get('SWAGGER_FILE')));

    swaggerFile.info = {
      title: APP_CONFIG.get('APP_NAME'),
      contact: {
        name: APP_CONFIG.getPkg('author'),
        email: APP_CONFIG.getPkg('email'),
      },
      description: APP_CONFIG.getPkg('description'),
      version: APP_CONFIG.getPkg('version'),
    };

    swaggerFile.schemes = [`${APP_CONFIG.get('APP_SCHEMA')}`];
    swaggerFile.host = `${APP_CONFIG.get('APP_HOST')}:${APP_CONFIG.get('APP_PORT')}`;
    swaggerFile.basePath = `${APP_CONFIG.get('APP_ROUTE_PREFIX')}`;

    app.use(
      APP_CONFIG.get('SWAGGER_ROUTE'),
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile, {
        customSiteTitle: `${APP_CONFIG.get('APP_NAME')} - Documentation`,
        customCss: '.swagger-ui .topbar { display: none }',
        customfavIcon: 'favicon.ico',
      })
    );
  }
  app.setGlobalPrefix(APP_CONFIG.get('APP_ROUTE_PREFIX'));

  // Setting up middlewares
  app.use(helmet());
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
  app.use(helmet.noCache());
  app.use(compression());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));

  // Setting up global filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  // let port = process.env.PORT ;
  // if (port === null || port === '') {
  //   port = APP_CONFIG.get('APP_PORT');
  // }
  await app.listen(process.env.PORT);
};

bootstrap().then(_ => {
  Logger.log(`Server running on ${APP_CONFIG.get('APP_HOST')}:${APP_CONFIG.get('APP_PORT')}`, 'Bootstrap');
});
