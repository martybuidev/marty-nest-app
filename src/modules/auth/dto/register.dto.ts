import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Trim } from '@/common/decorator';

export class RegisterDto {
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.toLowerCase() : (value as string),
  )
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Trim()
  fullName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
