import * as dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

import { databaseConfig } from '@/config/config';

dotenv.config();
const dbOptions = databaseConfig();

export const AppDataSource = new DataSource({
  ...dbOptions,
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
  entities: [path.join(__dirname, '..', 'modules', '**', '*.entity.{js,ts}')],
  synchronize: false,
});
