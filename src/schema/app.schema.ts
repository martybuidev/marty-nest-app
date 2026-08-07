import { z } from 'zod';

export const appSchema = z.object({
  port: z.coerce.number().int().positive().default(3001),
  rateTtl: z.coerce.number().int().positive().default(3001),
  rateLimit: z.coerce.number().int().positive().default(3001),
});

export type TAppConfig = z.infer<typeof appSchema>;
