import { z } from 'zod';

export const createTourSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  duration: z
    .number({
      required_error: 'Duration is required',
      invalid_type_error: 'Duration must be a number',
    })
    .int(),
  maxGroupSize: z
    .number({
      required_error: 'Maximum group size is required',
      invalid_type_error: 'Maximum group size must be a number',
    })
    .int(),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  priceDiscount: z
    .number({
      invalid_type_error: 'Price discount must be a number',
    })
    .optional(),
  summary: z.string({
    required_error: 'Summary is required',
    invalid_type_error: 'Summary must be a string',
  }),
  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .optional(),
  imageCover: z.string(),
  startDates: z.array(
    z.string().datetime({ message: 'Date must be in ISO String' })
  ),
});

export const createTourEventSchema = z.object({
  wineryId: z.string({
    invalid_type_error: 'wineryId must be a string',
    required_error: 'wineryId is Required',
  }),
  tourId: z.string({
    invalid_type_error: 'tourId must be a string',
    required_error: 'tourId is Required',
  }),
  day: z.number({
    invalid_type_error: 'tourId must be a string',
    required_error: 'The tour day is Required',
  }),
  specialEvent: z
    .boolean({ invalid_type_error: 'specialEvent must be a boolean' })
    .optional(),
});

export type CreateTourType = z.infer<typeof createTourSchema>;
