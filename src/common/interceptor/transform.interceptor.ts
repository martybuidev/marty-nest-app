import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IApiSuccessResponse } from '../type';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  IApiSuccessResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiSuccessResponse<T>> {
    const statusCode: number = context
      .switchToHttp()
      .getResponse<Response>().statusCode;
    return next.handle().pipe(
      map((data: T) => {
        return {
          success: true,
          statusCode,
          message: 'Success',
          data,
        };
      }),
    );
  }
}
