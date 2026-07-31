import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Category } from '@/modules/category/entities/category.entity';
import { Image } from '@/modules/image/entities/image.entity';
import { OrderItem } from '@/modules/order/entities/order-item.entity';
import { Order } from '@/modules/order/entities/order.entity';
import { Product } from '@/modules/product/entities/product.entity';

dotenv.config();

const MIGRATE_MODULE = process.env.MIGRATE_MODULE || '**';

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE || 'postgres') as 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dbname',
  entities: [Category, Image, Order, OrderItem, Product],
  migrations: [`src/modules/${MIGRATE_MODULE}/migrations/*.ts`],
  synchronize: false,
});
