import { Booking, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBookings = async (
  where?: Prisma.BookingWhereInput,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.findMany({ where, select })) as Booking[];
};

export const getBooking = async (
  where: Prisma.BookingWhereUniqueInput,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.findUnique({
    where,
    select,
  })) as Booking;
};
