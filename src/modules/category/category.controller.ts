import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { Serialize } from '@/common/decorator';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseCategoryDto } from './dto/response-category-dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Serialize(ResponseCategoryDto)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Serialize(ResponseCategoryDto)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Serialize(ResponseCategoryDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Serialize(ResponseCategoryDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
