import { IAppConfig, IDatabaseConfig } from './';

export interface IConfiguration {
  app: IAppConfig;
  database: IDatabaseConfig;
}
