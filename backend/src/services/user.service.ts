import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const craeteUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const getUser = async (
  where: Prisma.UserWhereUniqueInput,
  include?: Prisma.UserInclude
) => {
  return (await prisma.user.findUnique({ where, include })) as User;
};
