import { z } from "zod";

export const feedbackSchema = z.object({
    formId: z.string().min(1),

    c_id: z.string().min(1),

    email: z.email().toLowerCase().trim(),

    name: z.string().trim().min(2).max(80),

    state: z.string().trim().max(80).optional().nullable(),

    country: z.string().trim().min(2).max(80),

    age: z.coerce.number().int().min(13).max(120),

    data: z.record(z.string(), z.any()).default({}),
  })
  .strict();

export type FeedbackInput =
  z.infer< typeof feedbackSchema >;