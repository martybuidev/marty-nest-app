import { z } from 'zod';

export const databaseSchema = z.object({
  type: z.enum(['postgres', 'mysql']).default('postgres'),
  host: z.string().default('localhost'),
  port: z.coerce.number().int().positive().default(5432),
  username: z.string().default('username'),
  password: z.string().default('password'),
  database: z.string().default('dbname'),
});

export type TDatabaseConfig = z.infer<typeof databaseSchema>;
