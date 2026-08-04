import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { trim } from '@/common/decorator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of category',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @trim()
  name: string;

  @ApiProperty({
    example: 'Electronic devices for househol',
    description: 'Description for category',
  })
  @IsString()
  description: string;
}
