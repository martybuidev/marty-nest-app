import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = request.headers['x-request-id'] as string;
    const userAgent = request.get('user-agent') || '';
    const { method, originalUrl } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        const msResponseTime = Date.now() - startTime;
        this.logger.debug({
          requestId,
          statusCode,
          method,
          originalUrl,
          msResponseTime,
          userAgent,
        });
      }),
      catchError((err: Error) => {
        const msResponseTime = Date.now() - startTime;

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorDetails: string = err.message;

        if (err instanceof HttpException) {
          statusCode = err.getStatus();
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
        } else if (err instanceof EntityNotFoundError) {
          statusCode = HttpStatus.NOT_FOUND;
        }
        this.logger.error({
          requestId,
          statusCode,
          method,
          originalUrl,
          msResponseTime,
          userAgent,
          errorDetails,
        });
        return throwError(() => err);
      }),
    );
  }
}
