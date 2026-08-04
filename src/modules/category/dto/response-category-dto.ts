import { Expose } from 'class-transformer';

export class ResponseCategoryDto {
  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;
}
