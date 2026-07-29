import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigServire } from '@nestjs/config';
import { AppConfigType, DatabaseConfigType } from 'src/schema';
@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigServire< {app: AppConfigType, database: DatabaseConfigType}, true>,
  ) {}

  get app(): AppConfigType {
    return this.configService.get('app', { infer: true });
  }

  get database(): DatabaseConfigType {
    return this.configService.get('database', { infer: true });
  }
}
