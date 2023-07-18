import { z } from 'zod';

const portRegex = /^\d+$/;

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().regex(portRegex).transform(Number),

  POSTGRES_VERSION: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z
    .string()
    .regex(portRegex, {
      message: 'Database port must be a positive integer number',
    })
    .transform(Number),
  DATABASE_URL: z.string(),

  REDIS_VERSION: z.string(),
  REDIS_URL: z.string(),
  REDIS_PORT: z.string().regex(portRegex).transform(Number),
});

export const env = envSchema.parse(process.env);
