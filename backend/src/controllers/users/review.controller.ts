import { NextFunction, Request, Response } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '../../utils/AppError';
import { BookingStatus, Prisma } from '@prisma/client';
import { getBookingById } from '../../services/booking.service';
import { createReview } from '../../services/review.service';

export const createReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user) return next(new AuthenticationError('Autentication Required'));

    const { bookingId, comment, rating } = req.body;

    const booking = await getBookingById({ id: bookingId });

    if (!booking) return next(new NotFoundError('Booking not found'));

    if (booking.status !== BookingStatus.COMPLETED)
      return next(new ValidationError('Booking is not completed'));

    const review: Prisma.ReviewCreateInput = {
      rating,
      comment,
      tour: { connect: { id: booking.tourId } },
      booking: { connect: { id: booking.id } },
      user: { connect: { id: booking.userId } },
    };
    const newReview = await createReview(review);

    res.status(201).json({
      status: 'success',
      data: newReview,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when creating the review')
    );
  }
};
