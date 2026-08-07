import { Expose } from 'class-transformer';

export class ResponseMediaDto {
  @Expose()
  name: string;

  @Expose()
  url?: string;

  @Expose()
  alt?: string;

  @Expose()
  isPrimary?: boolean;
}
