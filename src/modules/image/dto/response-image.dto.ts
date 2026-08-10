import { Expose } from 'class-transformer';

export class ResponseImageDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  url?: string;

  @Expose()
  alt?: string;

  @Expose()
  isPrimary?: boolean;
}
