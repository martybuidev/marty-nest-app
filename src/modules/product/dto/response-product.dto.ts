import { Expose, Transform, Type } from 'class-transformer';

import { ResponseImageDto } from '@/modules/image/dto/response-image.dto';

import { Product } from '../entities/product.entity';

export class ResponseProductDto {
  @Expose()
  sku: string;

  @Expose()
  brandName: string;

  @Expose()
  @Transform(({ obj }: { obj: Product }) => obj.category?.name)
  categoryName: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  @Type(() => ResponseImageDto)
  images: ResponseImageDto[];
}
