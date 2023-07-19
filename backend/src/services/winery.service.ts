import { Prisma, PrismaClient, Winery } from '@prisma/client';

const prisma = new PrismaClient();

export const createWinery = async (input: Prisma.WineryCreateInput) => {
  return (await prisma.winery.create({
    data: input,
  })) as Winery;
};

export const getAllWineries = async (select?: Prisma.WinerySelect) => {
  return (await prisma.winery.findMany({
    select,
  })) as Winery[];
};

export const getWinery = async (where: Prisma.WineryWhereUniqueInput) => {
  return (await prisma.winery.findUnique({ where })) as Winery;
};
