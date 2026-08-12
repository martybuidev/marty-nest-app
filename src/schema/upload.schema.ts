import z from 'zod';

export const uploadSchema = z.object({
  maxSizeBytes: z.coerce.number().int().positive().default(5242880),
  allowedTypes: z.string().min(1),
});

export type TUploadConfig = z.infer<typeof uploadSchema>;
