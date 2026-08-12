import { ObjectLiteral } from 'typeorm';

import { OrmFilterBuilder } from './orm-filter.builder';

export type FilterFn<T extends ObjectLiteral> = (
  column: string,
  value: unknown,
) => OrmFilterBuilder<T>;
