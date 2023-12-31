import { Booking, Prisma, PrismaClient, Review, User } from '@prisma/client';
import { envVars } from '../configs/env.config';
import { signJwt } from '../utils/jwtUtils';
import { redisClient } from '../databases/redis.db';

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const getUser = async (
  where: Prisma.UserWhereInput,
  select?: Prisma.UserSelect
) => {
  where.active = true;
  return (await prisma.user.findFirst({ where, select })) as User;
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  input: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect
) => {
  return await prisma.user.update({ where, data: input, select });
};

export const signTokens = async (user: Prisma.UserCreateInput) => {
  // 1. Create session
  const userSession = { id: user.id, email: user.email };
  redisClient.set(`${user.id}`, JSON.stringify(userSession), {
    EX: envVars.REDIS_CACHE_EXPIRES * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'ACCESS_TOKEN_PRIVATE_KEY', {
    expiresIn: `${envVars.ACCESS_TOKEN_EXPIRES}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'REFRESH_TOKEN_PRIVATE_KEY', {
    expiresIn: `${envVars.REFRESH_TOKEN_EXPIRES}m`,
  });

  return { access_token, refresh_token };
};
