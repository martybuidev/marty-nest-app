import { Injectable } from '@nestjs/common';

import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { OrmFilterBuilder } from './orm-filter.builder';

@Injectable()
export class OrmFilterFactory {
  create<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
  ): OrmFilterBuilder<T> {
    return new OrmFilterBuilder<T>(qb);
  }
}
