import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';

import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

// only import module in this file, no config here
@Module({
  imports: [ConfigModule, DatabaseModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
