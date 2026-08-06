import { registerAs } from '@nestjs/config';

import {
  appSchema,
  corsSchema,
  databaseSchema,
  storagePresignSchema,
} from '@/schema';

export const crosConfig = registerAs('cors', () => {
  return corsSchema.parse({
    origin: process.env.CROSS_ORIGIN,
  });
});

export const appConfig = registerAs('app', () => {
  return appSchema.parse({
    port: process.env.PORT,
    rateTtl: process.env.RATE_TTL,
    rateLimit: process.env.RATE_LIMIT,
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

export const storagePresignConfig = registerAs('storagePresign', () => {
  return storagePresignSchema.parse({
    maxSizeBytes: process.env.STORAGE_EXPIRES_IN_MAX_SIZE_BYTES,
    allowedTypes: process.env.STORAGE_EXPIRES_IN_ALLOWED_TYPES,
    region: process.env.STORAGE_REGION,
    accountId: process.env.STORAGE_ACCOUNT_ID,
    endPoint: process.env.STORAGE_ENDPOINT,
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
    bucket: process.env.STORAGE_BUCKET,
    publicBaseUrl: process.env.STORAGE_PUBLIC_BASE_URL,
    expiresIn: process.env.STORAGE_EXPIRES_IN,
  });
});
