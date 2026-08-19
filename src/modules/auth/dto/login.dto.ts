import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum EAuthProvider {
  CREDENTIAL = 'credential',
  GOOGLE = 'google',
}
export class LoginDto {
  @IsEnum(EAuthProvider)
  provider: EAuthProvider;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  token?: string;
}
