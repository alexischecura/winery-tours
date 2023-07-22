import { z } from 'zod';

export const winerySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  adrress: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string',
  }),
  images: z.array(
    z.string({
      invalid_type_error: 'Image must be a string(URL)',
    })
  ),
  imageCover: z.string({
    required_error: 'Image Cover is required',
    invalid_type_error: 'Image Cover must be a string (URL)',
  }),
  coordinates: z.tuple([z.number(), z.number()], {
    required_error: 'Coordinates are required',
    invalid_type_error: 'Coordinates must be a tuple of number',
  }),
});

export type wineryType = z.infer<typeof winerySchema>;
