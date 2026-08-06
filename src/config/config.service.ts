import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import {
  TAppConfig,
  TCorsConfig,
  TDatabaseConfig,
  TR2PresignConfig,
} from '@/schema';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService<
      {
        app: TAppConfig;
        database: TDatabaseConfig;
        cors: TCorsConfig;
        r2Presign: TR2PresignConfig;
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

  get r2Presign(): TR2PresignConfig {
    return this.configService.get('r2Presign', { infer: true });
  }
}
