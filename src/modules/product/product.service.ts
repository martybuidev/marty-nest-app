import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { generateSlug } from '@/common/util';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const sku = createProductDto.sku;
    const existingSku = await this.productRepository.findOneBy({ sku });

    if (existingSku) {
      throw new ConflictException(
        `A product with "${sku}" SKU is taken! Please choose a different SKU.`,
      );
    }

    let slug = generateSlug(createProductDto.name);
    const existingSlug = await this.productRepository.findOneBy({ slug });

    if (existingSlug) {
      slug = slug + '-' + sku;
    }

    const createdProduct = this.productRepository.create({
      ...createProductDto,
      slug,
    });

    return await this.productRepository.save(createdProduct);
  }

  async findAll() {
    return await this.productRepository.find({ relations: { images: true } });
  }

  async findOne(id: number) {
    return await this.productRepository.findOneOrFail({
      where: { id },
      relations: { images: true },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneByOrFail({ id });
    const newName = updateProductDto.name;
    const isNameChanged = newName && newName !== product.name;

    if (isNameChanged) {
      let newSlug = generateSlug(newName);
      const existingSlug = await this.productRepository.findOneBy({
        slug: newSlug,
      });
      if (existingSlug) {
        newSlug = newSlug + '-' + product.sku;
      }
    }

    const updatedProduct = this.productRepository.merge(
      product,
      updateProductDto,
    );
    return await this.productRepository.save(updatedProduct);
  }

  async remove(id: number) {
    await this.productRepository.findOneByOrFail({ id });

    return this.productRepository.delete({ id });
  }
}
