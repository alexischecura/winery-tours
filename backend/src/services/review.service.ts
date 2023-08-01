import { Prisma, PrismaClient, Review } from '@prisma/client';

const prisma = new PrismaClient();

export const createReview = async (input: Prisma.ReviewCreateInput) => {
  return (await prisma.review.create({
    data: input,
  })) as Review;
};

export const getAllReviews = async (
  where?: Prisma.ReviewWhereInput,
  select?: Prisma.ReviewSelect
) => {
  return (await prisma.review.findMany({ where, select })) as Review[];
};

export const getReview = async (
  where: Prisma.ReviewWhereUniqueInput,
  select?: Prisma.ReviewSelect
) => {
  return (await prisma.review.findUnique({
    where,
    select,
  })) as Review;
};
