import { z } from 'zod';

const createTourSchema = z.object({
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
      required_error: 'Price discount is required',
      invalid_type_error: 'Price discount must be a number',
    })
    .optional(),
  summary: z.string({
    required_error: 'Summary is required',
    invalid_type_error: 'Summary must be a string',
  }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .optional(),
  images: z.array(z.string()),
  startDates: z.array(z.date()),
  secretTour: z.boolean().optional(),
});
