import { Transform } from 'class-transformer';

export function trim(): PropertyDecorator {
  return Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value,
  );
}
