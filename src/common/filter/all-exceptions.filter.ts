import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import { ERROR_MESSAGE } from '@/common/constant';
import { IApiErrorResponse } from '@/common/type';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const res = exception.getResponse();

      return response.status(statusCode).json(res);
    }

    if (exception instanceof EntityNotFoundError) {
      const body: IApiErrorResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: ERROR_MESSAGE.NOT_FOUND,
        error: ERROR_MESSAGE.NOT_FOUND,
      };
      return response.status(HttpStatus.NOT_FOUND).json(body);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof Error ? exception.message : 'Unknown error';
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(`Unhandled Exception: ${message}`, stack);

    const body: IApiErrorResponse = {
      statusCode: status,
      message: ERROR_MESSAGE.INTERNAL,
      error: ERROR_MESSAGE.INTERNAL,
    };
    return response.status(status).json(body);
  }
}
