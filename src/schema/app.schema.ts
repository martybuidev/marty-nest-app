import { z } from 'zod';

export const appSchema = z.object({
  port: z.coerce.number().int().positive().default(3001),
  rateTtl: z.coerce.number().int().positive().default(60000),
  rateLimit: z.coerce.number().int().positive().default(100),
});

export type TAppConfig = z.infer<typeof appSchema>;
