import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';

import { LoggingMiddleware, RequestIdMiddleware } from './common/middleware';
import { RateLimitingModule } from './config/rate-limiting.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

// only import module in this file, no config here
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RateLimitingModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggingMiddleware).forRoutes('*');
  }
}
