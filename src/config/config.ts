import { registerAs } from '@nestjs/config';

import { appSchema, databaseSchema } from '@/schema';

export const appConfig = registerAs('app', () => {
  return appSchema.parse({
    port: process.env.PORT,
  });
});

export const databaseConfig = registerAs('database', () => {
  return databaseSchema.parse({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
});
