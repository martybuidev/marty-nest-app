import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@/config/config.service';
import { DatabaseConfigType } from '@/schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (appConfigService: ConfigService): DatabaseConfigType => {
        const dbConfig = appConfigService.database;

        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          databaseName: dbConfig.databaseName,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
