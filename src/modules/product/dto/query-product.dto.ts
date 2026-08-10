import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import {
  PAGINATION_SORTBY_PRODUCT,
  type TPaginationSortByProduct,
} from '@/common/constant';
import { PaginationDto } from '@/common/pagination/pagination.dto';

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
  @Transform(({ value }) => {
    if (value === undefined || value === '') return undefined;
    if (value === 'true') return true;
    return false;
  })
  @IsBoolean()
  inStock?: boolean;

  @IsOptional()
  @IsIn(Object.keys(PAGINATION_SORTBY_PRODUCT))
  sortBy?: TPaginationSortByProduct;
}
