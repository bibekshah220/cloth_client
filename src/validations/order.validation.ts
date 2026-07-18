import { z } from 'zod';

export const shippingAddressSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(6, 'Phone number is required'),
  street: z.string().min(3, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;
