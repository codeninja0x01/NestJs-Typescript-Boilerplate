import { Request, Response } from 'express';

import { HttpStatus, Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';

import { isProdMode } from '../app.environment';
import { ConfigService } from '../app/config/config.service';

@Injectable()
export class CorsMiddleware implements NestMiddleware {

  constructor(private config: ConfigService) {
  }

  public use(request: Request, response: Response, next: any): any {
    const getMethod = method => RequestMethod[method];
    const origins = request.headers.origin;
    const origin = (Array.isArray(origins) ? origins[0] : origins) || '';
    const allowedOrigins = [this.config.get('ALLOWED_ORIGINS')];
    const allowedMethods = [RequestMethod.GET, RequestMethod.HEAD, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.POST, RequestMethod.DELETE];
    const allowedHeaders = ['Authorization', 'Origin', 'No-Cache', 'X-Requested-With', 'If-Modified-Since', 'Pragma', 'Last-Modified', 'Cache-Control',
    'Expires', 'Content-Type', 'X-E4M-With'];

    console.log(allowedOrigins);
    console.log(origins);
    // Allow Origin
    if (!origin || allowedOrigins.includes(origin) || isProdMode) {
      response.setHeader('Access-Control-Allow-Origin', origin || '*');
    }

    // Headers
    response.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
    response.header('Access-Control-Allow-Methods',  allowedMethods.map(getMethod).join(','));
    response.header('Access-Control-Max-Age', '1728000');
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.header('X-Powered-By', `${this.config.get('APP_NAME')} ${this.config.getPkg('version')}`);

    // OPTIONS Request
    if (request.method === getMethod(RequestMethod.OPTIONS)) {
      return response.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      return next();
    }
  }
}
