import { DatabaseType } from "src/types";

export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  databaseName: string;
}