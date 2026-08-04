import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers['x-request-id'] as string;
    const userAgent = request.get('user-agent') || '';
    const { method, originalUrl } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - startTime;
        this.logger.debug(
          `[SUCCESS] [${requestId}] ${method} ${originalUrl} ${delay} ms - Agent: ${userAgent} `,
        );
      }),
      catchError((err: Error) => {
        const delay = Date.now() - startTime;
        this.logger.error(
          `[FAIL] [${requestId}] ${method} ${originalUrl} ${delay}ms - Agent: ${userAgent} - ${err}`,
        );
        return throwError(() => err);
      }),
    );
  }
}
