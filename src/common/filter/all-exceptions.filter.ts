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

import { IApiErrorResponse } from '../type';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const res = exception.getResponse();

      const body = {
        success: false,
        ...(typeof res === 'object'
          ? res
          : { statusCode, message: res, error: 'Bad request' }),
      };
      return response.status(statusCode).json(body);
    }

    if (exception instanceof EntityNotFoundError) {
      this.logger.error(`Entity Not Found ${exception.message}`);
      const body: IApiErrorResponse = {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Resource not found',
        error: 'Not found',
      };
      return response.status(HttpStatus.NOT_FOUND).json(body);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof Error ? exception.message : 'Unknown error';
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(`Unhandled Exception: ${message}`, stack);

    const body: IApiErrorResponse = {
      success: false,
      statusCode: status,
      message: 'Internal server error',
      error: 'Internal Server Error',
    };
    return response.status(status).json(body);
  }
}
