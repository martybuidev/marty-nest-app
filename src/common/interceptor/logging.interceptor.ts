import {
  CallHandler,
  ExecutionContext,
  HttpException,
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
        let errorDetails: string = err.message;

        if (err instanceof HttpException) {
          const res = err.getResponse();

          if (typeof res === 'string') {
            errorDetails = res;
          } else if (typeof res === 'object' && res !== null) {
            const resObj = res as Record<string, unknown>;
            const message = resObj.message;

            if (Array.isArray(message)) {
              errorDetails = message.map(String).join(', ');
            } else if (typeof message === 'string') {
              errorDetails = message;
            }
          }
        }
        this.logger.error(
          `[FAIL] [${requestId}] ${method} ${originalUrl} ${delay}ms - Agent: ${userAgent} - ${errorDetails}`,
        );
        return throwError(() => err);
      }),
    );
  }
}
