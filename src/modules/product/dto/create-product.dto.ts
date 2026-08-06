import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateImageDto } from '@/modules/image/dto/create-image.dto';

export class CreateProductDto {
  @IsInt()
  @Min(1)
  categoryId: number;

  @IsString()
  @MaxLength(20)
  sku: string;

  @IsString()
  @MaxLength(255)
  brandName: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  @Max(32767)
  stockQuantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateImageDto)
  images: CreateImageDto[];
}
