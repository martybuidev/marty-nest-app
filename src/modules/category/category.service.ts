import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseCategoryDto } from './dto/response-category-dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = this.categoryRepository.create(createCategoryDto);

    const existingCategory = await this.categoryRepository.findOneBy({
      name: createdCategory.name,
    });

    if (existingCategory)
      throw new ConflictException(
        `Category with name ${createdCategory.name} has already existed`,
      );

    const savedCategory = await this.categoryRepository.save(createdCategory);

    return plainToInstance(ResponseCategoryDto, savedCategory, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    return plainToInstance(ResponseCategoryDto, categories, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneByOrFail({ id });

    return plainToInstance(ResponseCategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneByOrFail({ id });

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );
    const savedCategory = await this.categoryRepository.save(updatedCategory);

    return plainToInstance(ResponseCategoryDto, savedCategory, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number) {
    await this.categoryRepository.findOneByOrFail({ id });

    return this.categoryRepository.delete({ id });
  }
}
