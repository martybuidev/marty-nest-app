import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigServire } from '@nestjs/config';
import { IAppConfig, IConfiguration, IDatabaseConfig } from 'src/interfaces';
@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigServire<IConfiguration, true>,
  ) {}

  get app(): IAppConfig {
    return this.configService.get('app', { infer: true });
  }

  get database(): IDatabaseConfig {
    return this.configService.get('database', { infer: true });
  }
}
