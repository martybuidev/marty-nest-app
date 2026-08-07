import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
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
      const statusCode = exception.getStatus();
      const res = exception.getResponse();

      return response.status(statusCode).json(res);
    }

    if (exception instanceof EntityNotFoundError) {
      const notFoundEx = new NotFoundException('Resource not found');

      return response
        .status(notFoundEx.getStatus())
        .json(notFoundEx.getResponse());
    }

    const message =
      exception instanceof Error ? exception.message : 'Unknown Error';
    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error({ message, stack });

    const internalException = new InternalServerErrorException();

    return response
      .status(internalException.getStatus())
      .json(internalException.getResponse());
  }
}
