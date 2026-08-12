import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import {
  TAppConfig,
  TCorsConfig,
  TDatabaseConfig,
  TStorageR2Config,
  TUploadConfig,
} from '@/schema';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService<
      {
        app: TAppConfig;
        database: TDatabaseConfig;
        cors: TCorsConfig;
        upload: TUploadConfig;
        storageR2: TStorageR2Config;
      },
      true
    >,
  ) {}

  get app(): TAppConfig {
    return this.configService.get('app', { infer: true });
  }

  get database(): TDatabaseConfig {
    return this.configService.get('database', { infer: true });
  }

  get cors(): TCorsConfig {
    return this.configService.get('cors', { infer: true });
  }

  get upload(): TUploadConfig {
    return this.configService.get('upload', { infer: true });
  }

  get storageR2(): TStorageR2Config {
    return this.configService.get('storageR2', { infer: true });
  }
}
