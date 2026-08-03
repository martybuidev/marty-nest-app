import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json(res);
    }

    if (exception instanceof EntityNotFoundError) {
      const notFound = new NotFoundException(exception.message);
      return response.status(HttpStatus.NOT_FOUND).json(notFound.getResponse());
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      message: 'Internal server error',
      error: 'Internal Server Error',
      statusCode: status,
    };

    const message =
      exception instanceof Error ? exception.message : 'Unknown error';
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(`Unhandled Exception: ${message}`, stack);

    return response.status(status).json(errorResponse);
  }
}
