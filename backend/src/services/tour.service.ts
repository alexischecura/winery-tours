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
  include?: Prisma.TourInclude
) => {
  return (await prisma.tour.findUnique({
    where,
    include,
  })) as Tour;
};

export const createTourEvent = async (input: Prisma.TourEventCreateInput) => {
  return (await prisma.tourEvent.create({
    data: input,
  })) as TourEvent;
};
