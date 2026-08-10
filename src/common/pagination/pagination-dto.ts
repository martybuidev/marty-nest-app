import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

import {
  PAGINATION_ORDER,
  type TPaginationOrder,
} from '../constant/pagination.constant';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @IsOptional()
  @IsIn(Object.keys(PAGINATION_ORDER))
  order?: TPaginationOrder = PAGINATION_ORDER.DESC;
}
