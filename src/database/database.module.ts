import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { DatabaseConfigType } from 'src/schema';

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
