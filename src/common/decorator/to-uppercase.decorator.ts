import { Transform } from 'class-transformer';

export function ToUpperCase(): PropertyDecorator {
  return Transform(({ value }): unknown =>
    typeof value === 'string' ? value.toUpperCase() : value,
  );
}
