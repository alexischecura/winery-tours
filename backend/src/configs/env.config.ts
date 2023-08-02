import { z } from 'zod';

const numberRegex = /^\d+$/;

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().regex(numberRegex).transform(Number),
  ORIGIN: z.string(),
  CLIENT_URL: z.string(),

  RATE_LIMIT_TIME_IN_SECONDS: z.string().regex(numberRegex).transform(Number),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().regex(numberRegex).transform(Number),
  EMAIL_FROM: z.string(),

  POSTGRES_VERSION: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z
    .string()
    .regex(numberRegex, {
      message: 'Database port must be a positive integer number',
    })
    .transform(Number),
  DATABASE_URL: z.string(),

  REDIS_VERSION: z.string(),
  REDIS_URL: z.string(),
  REDIS_PORT: z.string().regex(numberRegex).transform(Number),
  REDIS_CACHE_EXPIRES: z.string().regex(numberRegex).transform(Number),

  ACCESS_TOKEN_PRIVATE_KEY: z.string(),
  ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  ACCESS_TOKEN_EXPIRES: z.string().regex(numberRegex).transform(Number),
  REFRESH_TOKEN_PRIVATE_KEY: z.string(),
  REFRESH_TOKEN_PUBLIC_KEY: z.string(),
  REFRESH_TOKEN_EXPIRES: z.string().regex(numberRegex).transform(Number),
});

export const envVars = envSchema.parse(process.env);
