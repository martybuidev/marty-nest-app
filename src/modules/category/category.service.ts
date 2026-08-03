import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { generateSlug } from '@/common/util/slug.util';

import { CreateCategoryDto } from './dto/create-category.dto';
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
    const slug = generateSlug(createCategoryDto.name);

    const existingCategory = await this.categoryRepository.findOneBy([
      { name: createdCategory.name },
      { slug },
    ]);

    if (existingCategory)
      throw new ConflictException({
        statusCode: 409,
        message: `A category with "${slug}" slug is taken! Please choose a different name.`,
        error: 'Slug Conflict',
      });

    return await this.categoryRepository.save(createdCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneByOrFail({ id });

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );

    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number) {
    await this.categoryRepository.findOneByOrFail({ id });

    return this.categoryRepository.delete({ id });
  }
}
