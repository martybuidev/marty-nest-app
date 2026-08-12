import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

import { ToLowerCase, Trim } from '@/common/decorator';
import { EUserRole, EUserStatus } from '@/common/enum';

import { PASSWORD_MIN_LENGTH } from '../constant/user.constant';

export class CreateUserDto {
  @IsEmail()
  @ToLowerCase()
  email: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @Trim()
  password: string;

  @IsString()
  @Trim()
  fullName: string;

  @IsEnum(EUserRole)
  role: EUserRole;

  @IsEnum(EUserStatus)
  status: EUserStatus;
}
