import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Response } from 'express';
import { map } from 'rxjs/operators';

import { RESPONSE_MESSAGE } from '@/common/constant';
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
          message: RESPONSE_MESSAGE.SUCCESS,
          data,
        };
      }),
    );
  }
}
