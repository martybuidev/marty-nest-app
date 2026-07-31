import * as dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

import { databaseConfig } from '@/config/config';

dotenv.config();

export const dbOptions = {
  ...databaseConfig(),
  entities: [path.join(__dirname, '..', 'modules', '**', '*.entity.{js,ts}')],
  synchronize: false,
};

export const AppDataSource = new DataSource({
  ...dbOptions,
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
});
