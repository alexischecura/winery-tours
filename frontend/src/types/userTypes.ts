import { z } from 'zod';

export const singUpUserSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Please provide your full name')
      .max(255)
      .regex(/^[a-zA-Z ]*$/, 'Please enter only letters'),
    email: z
      .string()
      .min(1, 'Please provide your email')
      .max(255)
      .email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Please provide a password')
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((user) => user.password === user.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Please provide your email')
    .max(255)
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Please provide a password')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type SingUpUserType = z.infer<typeof singUpUserSchema>;
export type LoginUserType = z.infer<typeof loginUserSchema>;

export interface SignUpUserResponse {
  status: string;
  message: string;
}

export interface LoginUserResponse {
  status: string;
  access_token: string;
}