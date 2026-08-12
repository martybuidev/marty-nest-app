import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { PaginationDto } from '@/common/pagination/pagination.dto';

import {
  PAGINATION_SORTBY_PRODUCT,
  type TPaginationSortByProduct,
} from '../constant/product-pagination.constant';

export class QueryProductDto extends PaginationDto {
  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : value === 'true',
  )
  @IsBoolean()
  inStock?: boolean;

  @IsOptional()
  @IsIn(Object.keys(PAGINATION_SORTBY_PRODUCT))
  sortBy?: TPaginationSortByProduct;
}
