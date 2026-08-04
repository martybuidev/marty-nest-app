import { Injectable, NestMiddleware } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const rawHeader = req.headers['x-request-id'];

    const headerValue = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;

    const requestId = headerValue || randomUUID();
    req.headers['x-request-id'] = requestId;
    res.setHeader('x-request-id', requestId);
    next();
  }
}
