import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { PAGINATION_DEFAULT, PAGINATION_ORDER } from '../constant';
import { PaginationDto } from './pagination.dto';

export async function paginate<T extends ObjectLiteral, D>(
  queryBuilder: SelectQueryBuilder<T>,
  query: PaginationDto & { sortBy?: string },
  itemsDto: ClassConstructor<D>,
  sortByMap: Record<string, string>,
): Promise<{ items: D[]; meta }> {
  const page = query.page ?? PAGINATION_DEFAULT.PAGE;
  const pageSize = query.pageSize ?? PAGINATION_DEFAULT.PAGE_SIZE;
  const order = query.order ?? PAGINATION_ORDER.DESC;
  const skip = (page - 1) * pageSize;

  const defaultSortKey = Object.keys(sortByMap)[0];
  const sortBy = sortByMap[query.sortBy || defaultSortKey];

  queryBuilder.orderBy(sortBy, order);

  const [items, total] = await queryBuilder
    .skip(skip)
    .take(pageSize)
    .getManyAndCount();

  const totalPage = Math.ceil(total / pageSize);

  return {
    items: plainToInstance(itemsDto, items, { excludeExtraneousValues: true }),
    meta: {
      page,
      pageSize,
      total,
      totalPage,
    },
  };
}
