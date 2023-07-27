import { NextFunction, Request, Response } from 'express';
import { AuthenticationError, ValidationError } from '../utils/AppError';
import { createBooking } from '../services/user.service';
import { getTour } from '../services/tour.service';

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user)
      return next(
        new AuthenticationError("Session has expired or user doesn't exist")
      );

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user)
      return next(
        new AuthenticationError("Session has expired or user doesn't exist")
      );

    const tour = await getTour({ id: req.body.tourId });

    if (!tour) {
      return next(new ValidationError('Tour not found'));
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
    next(error);
  }
};
