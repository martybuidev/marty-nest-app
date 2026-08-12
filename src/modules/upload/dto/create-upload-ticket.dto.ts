import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class createUploadTicketDto {
  @IsString()
  @MaxLength(255)
  fileName: string;

  @IsString()
  mime: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number;
}
