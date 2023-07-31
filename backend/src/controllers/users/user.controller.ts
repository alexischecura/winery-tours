import { NextFunction, Request, Response } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '../../utils/AppError';
import {
  createBooking,
  getUser,
  updateUser,
} from '../../services/user.service';
import { getTour } from '../../services/tour.service';
import { getAllBookings } from '../../services/booking.service';

// Get current user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user)
      return next(new AuthenticationError('User authentication required'));

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

// Change the role to a user
export const changeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser({ id: req.body.userId });
    if (!user)
      return next(
        new NotFoundError(
          `The user with the id ${req.body.userId} was not found.`
        )
      );

    const userWithNewRole = await updateUser(
      {
        id: req.body.userId,
      },
      {
        role: req.body.role,
      }
    );
    res.status(200).json({
      status: 'success',
      message: `The user ${userWithNewRole.email} now have the role of ${userWithNewRole.role}.`,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when changing the role.')
    );
  }
};

// Create a booking
export const createBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user)
      return next(new AuthenticationError('User authentication required'));

    const { tourId, tourDate } = req.body;

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

// Get all bookings
export const getAllUserBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await getAllBookings({ userId: res.locals.user.id });

    res.status(200).json({
      status: 'success',
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when getting all user bookings'
      )
    );
  }
};
