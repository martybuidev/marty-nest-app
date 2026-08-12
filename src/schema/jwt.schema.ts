import z from 'zod';

export const jwtSchema = z.object({
  accessSecret: z.string().min(1),
  accessExpiration: z.coerce.number().min(1),
  refreshSecret: z.string().min(1),
  refreshExpiration: z.coerce.number().min(1),
});

export type TJwtConfig = z.infer<typeof jwtSchema>;
