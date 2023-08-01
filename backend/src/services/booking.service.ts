import { Booking, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBooking = async (input: Prisma.BookingCreateInput) => {
  return (await prisma.booking.create({
    data: input,
  })) as Booking;
};

export const getAllBookings = async (
  where?: Prisma.BookingWhereInput,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.findMany({ where, select })) as Booking[];
};
export const getBookingById = async (
  where: Prisma.BookingWhereUniqueInput,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.findUnique({
    where,
    select,
  })) as Booking;
};
export const getBooking = async (
  where: Prisma.BookingWhereInput,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.findFirst({
    where,
    select,
  })) as Booking;
};

export const updateBooking = async (
  where: Prisma.BookingWhereUniqueInput,
  input: Prisma.BookingUpdateInput,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.update({
    where,
    data: input,
    select,
  })) as Booking;
};
