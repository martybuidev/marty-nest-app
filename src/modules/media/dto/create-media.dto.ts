import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsUrl()
  @ApiProperty({ example: 'https://nestjs.com/nest-og.png' })
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  alt?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
