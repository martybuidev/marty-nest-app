import { Transform } from 'class-transformer';

export function ToLowerCase(): PropertyDecorator {
  return Transform(({ value }): unknown =>
    typeof value === 'string' ? value.toLocaleLowerCase() : value,
  );
}
