import { registerAs } from '@nestjs/config';

import {
  appSchema,
  corsSchema,
  databaseSchema,
  r2PresignSchema,
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

export const r2PresignConfig = registerAs('r2Presign', () => {
  return r2PresignSchema.parse({
    maxSizeBytes: process.env.R2_MAX_SIZE_BYTES,
    allowedTypes: process.env.R2_ALLOWED_TYPES,
    region: process.env.R2_REGION,
    accountId: process.env.R2_ACCOUNT_ID,
    endPoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET,
    publicBaseUrl: process.env.R2_PUBLIC_BASE_URL,
    expiresIn: process.env.R2_EXPIRES_IN,
  });
});
