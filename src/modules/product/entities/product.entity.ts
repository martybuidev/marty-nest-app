import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '@/modules/category/entities/category.entity';
import { Image } from '@/modules/image/entities/image.entity';
import { OrderItem } from '@/modules/order/entities/order-item.entity';

@Entity('products')
@Check(`"price" >= 0 and "stock_quantity" >= 0`)
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 20, unique: true })
  sku: string;

  @Column({ name: 'brand_name', type: 'varchar', length: 255 })
  brandName: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  price: number;

  @Column({ name: 'stock_quantity', type: 'smallint' })
  stockQuantity: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
