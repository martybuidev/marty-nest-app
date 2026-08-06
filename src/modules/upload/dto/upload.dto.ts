import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class PresignDto {
  @IsString()
  fileName: string;

  @IsString()
  mime: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number;
}
