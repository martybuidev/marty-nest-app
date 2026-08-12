import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonBaseEntity } from '@/common/entity/base.entity';
import { Product } from '@/modules/product/entities/product.entity';

@Entity('medias')
export class Media extends CommonBaseEntity {
  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.medias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name?: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  alt?: string;

  @Column({
    name: 'is_primary',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isPrimary?: boolean;
}
