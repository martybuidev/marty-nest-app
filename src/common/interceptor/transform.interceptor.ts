import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Response } from 'express';
import { map } from 'rxjs/operators';

import { IApiSuccessResponse } from '@/common/type';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  IApiSuccessResponse<T>
> {
  intercept(context: ExecutionContext, next: CallHandler) {
    const statusCode: number = context
      .switchToHttp()
      .getResponse<Response>().statusCode;
    return next.handle().pipe(
      map((data: T): IApiSuccessResponse<T> => {
        return {
          statusCode,
          message: 'OK',
          data,
        };
      }),
    );
  }
}
