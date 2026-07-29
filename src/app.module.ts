import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

// only import module in this file, no config here
@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
