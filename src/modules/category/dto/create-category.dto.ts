import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { trim } from '@/common/decorator/trim.decorator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @trim()
  name: string;

  @IsString()
  description: string;
}
