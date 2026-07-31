import { Check, Column, Entity, OneToMany } from 'typeorm';

import { CommonBaseEntity } from '@/common/entity/base.entity';
import { EOrderStatus } from '@/common/enum/order-status.enum';

import { OrderItem } from './order-item.entity';

@Entity('orders')
@Check(`"total" >= 0`)
export class Order extends CommonBaseEntity {
  @Column({ name: 'customer_phone', type: 'varchar', length: 11 })
  customerPhone: string;

  @Column({ name: 'customer_name', type: 'varchar', length: 255 })
  customerName: string;

  @Column({ name: 'customer_email', type: 'varchar', length: 255 })
  customerEmail: string;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    default: EOrderStatus.PENDING,
  })
  status: EOrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
