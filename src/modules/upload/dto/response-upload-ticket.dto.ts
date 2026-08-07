import { Expose } from 'class-transformer';

export class ResponseUploadTicketDto {
  @Expose() uploadUrl: string;
  @Expose() publicUrl: string;
}
