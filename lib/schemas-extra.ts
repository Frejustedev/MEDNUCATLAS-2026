import { z } from 'zod';

export const roleRequestSchema = z.object({
  requestedRole: z.enum(['medecin_non_nuc', 'medecin_nuc']),
  justification: z.string().min(20, 'Justification trop courte (20 caractères min)').max(2000),
});

export type RoleRequestInput = z.infer<typeof roleRequestSchema>;
