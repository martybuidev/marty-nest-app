import { Column, Entity, OneToMany } from 'typeorm';

import { CommonBaseEntity } from '@/common/entity/base.entity';
import { Product } from '@/modules/product/entities/product.entity';

@Entity('categories')
export class Category extends CommonBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
