import { registerAs } from '@nestjs/config';

import {
  appSchema,
  authSchema,
  corsSchema,
  databaseSchema,
  storageR2Schema,
  uploadSchema,
} from '@/schema';
import { jwtSchema } from '@/schema/jwt.schema';

export const corsConfig = registerAs('cors', () => {
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

export const jwtConfig = registerAs('jwt', () => {
  return jwtSchema.parse({
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
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

export const uploadConfig = registerAs('upload', () => {
  return uploadSchema.parse({
    maxSizeBytes: process.env.STORAGE_MAX_SIZE_BYTES,
    allowedTypes: process.env.STORAGE_ALLOWED_TYPES,
  });
});

export const storageR2Config = registerAs('storageR2', () => {
  return storageR2Schema.parse({
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

export const authConfig = registerAs('auth', () => {
  return authSchema.parse({
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  });
});
