import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { TJwtPayload } from '@/modules/auth/strategies/jwt.strategy';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TJwtPayload => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as TJwtPayload;
  },
);
