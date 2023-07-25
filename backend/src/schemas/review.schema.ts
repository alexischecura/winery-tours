import { z } from 'zod';

export const reviewSchema = z.object({
  name: z
    .number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    })
    .max(5)
    .min(1),
  comment: z.string({
    required_error: 'Comment is required',
    invalid_type_error: 'Comment must be a string',
  }),
});

export type reviewType = z.infer<typeof reviewSchema>;
