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
    const slug = generateSlug(createCategoryDto.name);

    const existingCategory = await this.categoryRepository.findOneBy([
      { name: createCategoryDto.name },
      { slug },
    ]);

    if (existingCategory)
      throw new ConflictException(
        `A category with "${slug}" slug is taken! Please choose a different name.`,
      );
    const createdCategory = this.categoryRepository.create({
      ...createCategoryDto,
      slug,
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
    const newName = updateCategoryDto.name;

    if (newName && newName !== category.name) {
      const newSlug = generateSlug(newName);
      const existingCategory = await this.categoryRepository.findOneBy([
        { name: newName },
        { slug: newSlug },
      ]);

      if (existingCategory && existingCategory.id !== id)
        throw new ConflictException(
          `A category with "${newSlug}" slug is taken! Please choose a different name.`,
        );

      category.slug = newSlug;
    }

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
