import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';

import { LOG_MESSAGE } from '@/common/constant';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    const requestId = req.headers['x-request-id'] as string;

    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    this.logger.log({
      logStatus: LOG_MESSAGE.INCOMING,
      requestId,
      method,
      originalUrl,
      ip,
      userAgent,
    });
    next();
  }
}
