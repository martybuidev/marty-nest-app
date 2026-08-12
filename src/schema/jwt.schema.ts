import z from 'zod';

export const jwtSchema = z.object({
  accessSecret: z.string().min(1),
  accessExpiration: z.string().min(1),
  refreshSecret: z.string().min(1),
  refreshExpiration: z.string().min(1),
});

export type TJwtConfig = z.infer<typeof jwtSchema>;
