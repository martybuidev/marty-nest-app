import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CustomBaseEntity } from '@/common/entity/base.entity';
import { Product } from '@/modules/product/entities/product.entity';

@Entity('images')
export class Image extends CustomBaseEntity {
  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  alt: string;
}
