import { Expose } from 'class-transformer';

export class ResponseCategoryDto {
  @Expose()
  categoryNam: string;

  @Expose()
  sku: string;

  @Expose()
  brandName: string;

  @Expose()
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
  images: string[];
}
