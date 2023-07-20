import { z } from 'zod';

enum UserRole {
  USER = 'USER',
  GUIDE = 'GUIDE',
  LEAD_GUIDE = 'LEAD_GUIDE',
  ADMIN = 'ADMIN',
}

export const createUserSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name bust be a string',
      })
      .max(255),
    email: z
      .string({
        required_error: 'E-mail is required',
        invalid_type_error: 'E-mail must be a string',
      })
      .max(255)
      .email('Invalid email address'),
    photo: z
      .string({
        invalid_type_error: 'Photo must be a string(URL)',
      })
      .optional(),
    role: z
      .nativeEnum(UserRole, {
        invalid_type_error: `Role must be one of this: ${JSON.stringify(
          Object.keys(UserRole)
        )}`,
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
