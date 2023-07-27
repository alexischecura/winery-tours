import { NextFunction, Request, Response } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
} from '../utils/AppError';
import { createBooking } from '../services/user.service';
import { getTour } from '../services/tour.service';

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
    const user = res.locals.user;

    if (!user) return next(new AuthenticationError('Session has expired'));

    const tour = await getTour({ id: req.body.tourId });

    if (!tour) {
      return next(
        new NotFoundError(`Tour with the id ${req.body.tourId} not found`)
      );
    }

    const booking = await createBooking({
      tourDate: req.body.tourDate,
      user: { connect: { id: user.id } },
      tour: { connect: { id: req.body.tourId } },
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
