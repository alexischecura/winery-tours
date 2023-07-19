import { Prisma, PrismaClient, Tour } from '@prisma/client';

const prisma = new PrismaClient();

export const createTour = async (input: Prisma.TourCreateInput) => {
  return (await prisma.tour.create({
    data: input,
  })) as Tour;
};

export const getAllTours = async (select?: Prisma.TourSelect) => {
  return (await prisma.tour.findMany({
    select,
  })) as Tour[];
};

export const getTour = async (
  where: Prisma.TourWhereUniqueInput,
  select?: Prisma.TourSelect
) => {
  return (await prisma.tour.findUnique({
    where,
    select,
  })) as Tour;
};
