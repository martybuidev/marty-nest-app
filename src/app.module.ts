import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './database/database.module';

// only import module in this file, no config here
@Module({
  imports: [AppConfigModule, DatabaseModule],
})
export class AppModule {}
