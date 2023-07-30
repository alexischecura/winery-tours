import { NextFunction, Request, Response } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '../utils/AppError';
import { createBooking } from '../services/user.service';
import { getTour } from '../services/tour.service';
import { Booking, Tour } from '@prisma/client';

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) return next(new AuthenticationError('Session has expired'));

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when getting the user'));
  }
};

export const createBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User authentication required
    const user = res.locals.user;

    const { tourId, tourDate } = req.body;

    if (!user) return next(new AuthenticationError('Session has expired'));

    const tour = await getTour({ id: tourId });

    if (!tour) {
      return next(new NotFoundError(`Tour with the id ${tourId} not found`));
    }

    if (!tour.startDates.map((date) => date.toISOString()).includes(tourDate)) {
      return next(new ValidationError('Tour Date not found in the tour'));
    }

    const booking = await createBooking({
      tourDate,
      user: { connect: { id: user.id } },
      tour: { connect: { id: tourId } },
    });

    res.status(201).json({
      status: 'success',
      data: booking,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when creating the booking')
    );
  }
};
