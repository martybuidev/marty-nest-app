import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { OrmFilterFactory } from '@/common/pagination/orm-filter.factory';
import { paginate } from '@/common/pagination/paginate.util';
import { generateSlug } from '@/common/util';

import { PAGINATION_SORTBY_PRODUCT } from './constant/product-pagination.constant';
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
    private readonly filterBuilder: OrmFilterFactory,
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

  async findList({
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

    this.filterBuilder
      .create(queryBuilder)
      .ilike(`p.name`, name)
      .ilike('p.brandName', brandName)
      .equal('p.categoryId', categoryId)
      .gte('p.price', minPrice)
      .lte('p.price', maxPrice)
      .booleanCondition('p.stockQuantity', inStock, '>', '<=', 0);

    const productPagination = paginate<Product, ResponseProductDto>(
      queryBuilder,
      query,
      ResponseProductDto,
      PAGINATION_SORTBY_PRODUCT,
    );

    return productPagination;
  }

  async findOneById(id: number) {
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
