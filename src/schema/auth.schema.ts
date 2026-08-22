import z from 'zod';

export const authSchema = z.object({
  googleClientId: z.string().min(1),
});

export type TAuthSConfig = z.infer<typeof authSchema>;
