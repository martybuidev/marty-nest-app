import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, Configuration, DatabaseConfig } from 'src/interfaces';
@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  get app(): AppConfig {
    return this.configService.get('app', { infer: true });
  }

  get database(): DatabaseConfig {
    return this.configService.get('database', { infer: true });
  }
}
