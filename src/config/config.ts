import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT!) || 3001,
}));

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DB_TYPE! || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!) || 5432,
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  databaseName: process.env.DB_NAME || 'dbname',
}));
