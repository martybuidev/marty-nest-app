import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ToLowerCase, Trim } from '@/common/decorator';

import { PASSWORD_MIN_LENGTH } from '../constant/user.constant';

export class CreateUserDto {
  @IsEmail()
  @ToLowerCase()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  fullName: string;
}
