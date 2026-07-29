import { z } from 'zod';

export const appSchema = z.object({
port: z.number().int().positive().default(3001),
});

export type AppConfigType = z.infer<typeof appSchema>;
