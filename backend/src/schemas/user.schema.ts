import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
      })
      .max(255)
      .regex(/^[a-zA-Z ]*$/),
    lastName: z
      .string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
      })
      .max(255)
      .regex(/^[a-zA-Z ]*$/),
    email: z
      .string({
        required_error: 'E-mail is required',
        invalid_type_error: 'E-mail must be a string',
      })
      .max(255)
      .email('Invalid email address'),
    nationalId: z.string(),
    photo: z
      .string({
        invalid_type_error: 'Photo must be a string(URL)',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Please provide your password',
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password too long, please provide a shorter password'),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine((user) => user.password === user.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type CreateUserType = Omit<
  z.infer<typeof createUserSchema>,
  'passwordConfirm'
>;

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Please provide your email',
      invalid_type_error: 'E-mail must be a string',
    })
    .max(255)
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Please privide your password',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password should be more than 8 characters')
    .max(32, 'Password should be less than 32 characters'),
});

export type LoginUser = z.infer<typeof loginUserSchema>;

export const tokenParamsSchema = z.object({
  token: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please provide your email',
      invalid_type_error: 'E-mail must be a string',
    })
    .max(255)
    .email('Invalid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Please provide your password',
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password too long, please provide a shorter password'),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine((user) => user.password === user.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export const changeRoleSchema = z.object({
  userId: z.string({
    required_error: 'Please provide the user id',
    invalid_type_error: 'Id must be a string',
  }),
  role: z.nativeEnum(UserRole),
});

export const createBookingSchema = z.object({
  tourId: z.string({
    required_error: 'Please provide the tour id',
    invalid_type_error: 'Id must be a string',
  }),
  tourDate: z.string().datetime({ message: 'Date must be in ISO String' }),
});

export const createReviewSchema = z.object({
  rating: z
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
  bookingId: z.string({
    required_error: 'bookingId is required',
    invalid_type_error: 'bookingId must be a string',
  }),
});
export type CreateReviewType = z.infer<typeof createReviewSchema>;
