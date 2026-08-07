import { Expose } from 'class-transformer';

export class ResponseStorageDto {
<<<<<<< HEAD
  @Expose()
  id: number;

=======
>>>>>>> 21e5938 (refact: change image module into storage module)
  @Expose()
  name: string;

  @Expose()
  url?: string;

  @Expose()
  alt?: string;

  @Expose()
  isPrimary?: boolean;
}
