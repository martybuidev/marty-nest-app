import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderItem } from './order-item.entity';
import { EOrderStatus } from './order-status.enum';

@Entity('orders')
@Check(`"total" >= 0`)
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
