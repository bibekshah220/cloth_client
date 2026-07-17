import { z } from 'zod';
import { Gender } from '@/types';

export const updateProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
