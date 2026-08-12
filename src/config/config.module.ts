import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import {
  appConfig,
  crosConfig,
  databaseConfig,
  storageR2Config,
  uploadConfig,
} from './config';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        appConfig,
        databaseConfig,
        crosConfig,
        uploadConfig,
        storageR2Config,
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
