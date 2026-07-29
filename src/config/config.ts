import { registerAs } from '@nestjs/config';
import { appSchema, databaseSchema } from 'src/schema';

export const appConfig = registerAs('app', () => {
  return appSchema.parse({
    port: parseInt(process.env.PORT!) || 3001,
  })
});

export const databaseConfig = registerAs('database', () => {
  return databaseSchema.parse({
    type: process.env.DB_TYPE! || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!) || 5432,
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    databaseName: process.env.DB_NAME || 'dbname',
  })
});
