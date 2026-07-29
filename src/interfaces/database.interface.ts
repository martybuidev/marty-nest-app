import { DatabaseType } from 'typeorm';
export interface IDatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  databaseName: string;
}
