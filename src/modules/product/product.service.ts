import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PAGINATION_SORTBY_PRODUCT } from '@/common/constant';
import { paginate } from '@/common/pagination/paginate.util';
import { generateSlug } from '@/common/util';

import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
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

  async findAll({
    name,
    brandName,
    categoryId,
    maxPrice,
    minPrice,
    inStock,
    ...query
  }: QueryProductDto) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.medias', 'medias');

    if (name) {
      queryBuilder.andWhere('p.name ILIKE :name', { name: `%${name}%` });
    }

    if (brandName) {
      queryBuilder.andWhere('p.brandName ILIKE :brandName', {
        brandName: `%${brandName}%`,
      });
    }

    if (categoryId !== undefined) {
      queryBuilder.andWhere('p.categoryId = :categoryId', {
        categoryId,
      });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('p.price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('p.price <= :maxPrice', {
        maxPrice,
      });
    }
    if (inStock !== undefined) {
      queryBuilder.andWhere(
        inStock ? 'p.stockQuantity > 0' : 'p.stockQuantity <= 0',
      );
    }

    const productPagination = paginate<Product, ResponseProductDto>(
      queryBuilder,
      query,
      ResponseProductDto,
      PAGINATION_SORTBY_PRODUCT,
    );

    return productPagination;
  }

  async findOne(id: number) {
    return await this.productRepository.findOneOrFail({
      where: { id },
      relations: { medias: true },
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
