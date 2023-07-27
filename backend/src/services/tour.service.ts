import { Prisma, PrismaClient, Tour, TourEvent } from '@prisma/client';

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

export const getTourWithWineries = async (
  where: Prisma.TourWhereUniqueInput
) => {
  return await prisma.tour.findUnique({
    where,
    include: { wineries: true },
  });
};

export const createTourEvent = async (input: Prisma.TourEventCreateInput) => {
  return (await prisma.tourEvent.create({
    data: input,
  })) as TourEvent;
};

export type TourWithWineries = Prisma.PromiseReturnType<
  typeof getTourWithWineries
>;
