import { ApiProperty } from '@nestjs/swagger';

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

import { CreateMediaDto } from '@/modules/media/dto/create-media.dto';

export class CreateProductDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 100 })
  categoryId: number;

  @IsString()
  @MaxLength(20)
  @ApiProperty({ example: `SKU - ${Date.now()}` })
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
  @Type(() => CreateMediaDto)
  medias: CreateMediaDto[];
}
