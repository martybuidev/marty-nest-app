import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import path from 'path';

import { ConfigService } from '@/config/config.service';

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
          entities: [
            path.join(__dirname, '..', 'modules', '**', '*.entity.{js,ts}'),
          ],
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
