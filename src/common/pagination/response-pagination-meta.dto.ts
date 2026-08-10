import { Expose } from 'class-transformer';

export class ResponsePaginationMetaDto {
  @Expose()
  page: number;

  @Expose()
  pageSize: number;

  @Expose()
  total: number;

  @Expose()
  totalPage: number;
}
