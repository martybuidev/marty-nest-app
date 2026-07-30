import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';

// only import module in this file, no config here
@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
