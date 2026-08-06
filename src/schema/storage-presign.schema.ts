import z from 'zod';

export const storagePresignSchema = z.object({
  maxSizeBytes: z.coerce.number().int().positive().default(5242880),
  allowedTypes: z.string().min(1),
  region: z.string().min(1),
  accountId: z.string().min(1),
  endPoint: z.string().min(1),
  accessKeyId: z.string().min(1),
  secretAccessKey: z.string().min(1),
  bucket: z.string().min(1),
  publicBaseUrl: z.url().min(1),
  expiresIn: z.coerce.number().int().positive().default(60),
});

export type TStoragePresignConfig = z.infer<typeof storagePresignSchema>;
