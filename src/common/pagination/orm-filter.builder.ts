import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { FilterFn } from './fn-filter.type';

export class OrmFilterBuilder<T extends ObjectLiteral> {
  constructor(private readonly queryBuilder: SelectQueryBuilder<T>) {}

  private isValid(value: unknown) {
    return value !== undefined && value !== null;
  }

  private getParamName(column: string, suffix: string): string {
    const cleanColumn = column.replace(/\./g, '_');
    return `${cleanColumn}_${suffix}`;
  }

  private apply(
    column: string,
    suffix: string,
    operatorSql: string,
    value: unknown,
    transform?: (v) => unknown,
  ) {
    if (this.isValid(value)) {
      const paramName = this.getParamName(column, suffix);

      const finalValue = transform ? transform(value) : value;
      this.queryBuilder.andWhere(`${column} ${operatorSql} :${paramName}`, {
        [paramName]: finalValue,
      });
    }

    return this;
  }
  ilike: FilterFn<T> = (column, value) => {
    return this.apply(column, 'ilike', 'ILIKE', value, (v) => `%${v}%`);
  };

  equal: FilterFn<T> = (column, value) => {
    return this.apply(column, 'eq', '=', value);
  };

  gte: FilterFn<T> = (column, value) => {
    return this.apply(column, 'gte', '>=', value);
  };

  lte: FilterFn<T> = (column, value) => {
    return this.apply(column, 'lte', '<=', value);
  };

  booleanCondition = (
    column: string,
    condition: boolean | undefined,
    isTrueOp: string,
    isFalseOp: string,
    value: unknown,
  ) => {
    if (this.isValid(condition)) {
      const operator = condition ? isTrueOp : isFalseOp;
      return this.apply(column, 'ct', operator, value);
    }
    return this;
  };
}
