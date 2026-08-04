import { z } from 'zod';

export const crosSchema = z.object({
  origin: z.string().default('http://localhost:3000'),
});

export type TCrosConfig = z.infer<typeof crosSchema>;
