import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { DatabaseConfig } from 'src/interfaces';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (appConfigService: ConfigService): DatabaseConfig => {
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
