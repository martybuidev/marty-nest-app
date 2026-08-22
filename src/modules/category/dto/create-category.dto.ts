import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Trim } from '@/common/decorator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of category',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Trim()
  name: string;

  @ApiProperty({
    example: 'Electronic devices for households',
    description: 'Description for category',
  })
  @IsString()
  @Trim()
  description: string;
}
