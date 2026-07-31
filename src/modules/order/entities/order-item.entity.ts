import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonBaseEntity } from '@/common/entity/base.entity';
import { Product } from '@/modules/product/entities/product.entity';

import { Order } from './order.entity';

@Entity('order_items')
@Check(`"quantity" >= 0`)
@Check(`"price" >= 0`)
export class OrderItem extends CommonBaseEntity {
  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'smallint' })
  quantity: number;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  price: number;
}
