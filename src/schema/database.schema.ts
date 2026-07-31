import { z } from 'zod';

export const databaseSchema = z.object({
  type: z.enum(['postgres', 'mysql']).default('postgres'),
  host: z.string().min(1).default('localhost'),
  port: z.coerce.number().int().positive().default(5432),
  username: z.string().min(1).default('username'),
  password: z.string().min(1).default('password'),
  database: z.string().min(1).default('dbname'),
});

export type TDatabaseConfig = z.infer<typeof databaseSchema>;
