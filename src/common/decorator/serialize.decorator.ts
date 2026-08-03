import { UseInterceptors } from '@nestjs/common';

import { ClassConstructor } from 'class-transformer';

import { SerializeInterceptor } from '../interceptor';

export function Serialize(
  dto: ClassConstructor<unknown>,
): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
