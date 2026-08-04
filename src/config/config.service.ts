import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigServire } from '@nestjs/config';

import { TAppConfig, TCrosConfig, TDatabaseConfig } from '@/schema';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigServire<
      { app: TAppConfig; database: TDatabaseConfig; cros: TCrosConfig },
      true
    >,
  ) {}

  get app(): TAppConfig {
    return this.configService.get('app', { infer: true });
  }

  get database(): TDatabaseConfig {
    return this.configService.get('database', { infer: true });
  }

  get cors(): TCrosConfig {
    return this.configService.get('cros', { infer: true });
  }
}
