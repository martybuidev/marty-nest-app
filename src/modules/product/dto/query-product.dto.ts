import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { PaginationDto } from '@/common/pagination/pagination-dto';

export class QueryProductDto extends PaginationDto {
  @IsOptional()
  @IsString()
  brandName: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  minPrice: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxPrice: number;

  @IsOptional()
  @IsBoolean()
  inStock: boolean;

  @IsOptional()
  sortBy: 'p.name' | 'p.price' | 'p.create_at';
}
