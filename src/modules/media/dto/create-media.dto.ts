import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { Trim } from '@/common/decorator';

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Trim()
  name?: string;

  @IsUrl()
  @ApiProperty({ example: 'https://nestjs.com/nest-og.png' })
  @Trim()
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Trim()
  alt?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
