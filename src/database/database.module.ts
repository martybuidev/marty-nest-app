import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@/config/config.service';
import { Category } from '@/modules/category/entities/category.entity';
import { Image } from '@/modules/image/entities/image.entity';
import { OrderItem } from '@/modules/order/entities/order-item.entity';
import { Order } from '@/modules/order/entities/order.entity';
import { Product } from '@/modules/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (appConfigService: ConfigService) => {
        const { database: dbConfig } = appConfigService;
        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [Category, Image, Order, OrderItem, Product],
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
