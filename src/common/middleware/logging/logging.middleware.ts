import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    this.logger.log(
      `[INCOMMING] ${method} ${originalUrl} - IP: ${ip} - Agent: ${userAgent}`,
    );
    next();
  }
}
