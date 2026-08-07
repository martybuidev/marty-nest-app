import { Expose, Type } from 'class-transformer';

import { ResponseMediaDto } from '@/modules/media/dto/response-media.dto';

export class ResponseProductDto {
  @Expose()
  sku: string;

  @Expose()
  brandName: string;

  @Expose()
  categoryId: number;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  @Type(() => ResponseMediaDto)
  medias: ResponseMediaDto[];
}
