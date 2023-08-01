import { NextFunction, Request, Response } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '../../utils/AppError';
import { getTour } from '../../services/tour.service';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from '../../services/booking.service';
import { BookingStatus } from '@prisma/client';

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
      return next(new ValidationError('Date not found in the tour'));
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

// Pay booking
export const payBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await getBookingById({ id: req.body.bookingId });
    if (booking.status !== BookingStatus.RESERVED)
      return next(
        new ValidationError(
          'The booking is not reserved, please make a new reservation'
        )
      );

    // TODO: add payment method

    const bookingUpdated = await updateBooking(
      {
        id: req.body.bookingId,
      },
      {
        status: BookingStatus.PAID,
      }
    );

    res.status(200).json({
      status: 'success',
      data: bookingUpdated,
    });
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError('Something went wrong when paying the booking')
    );
  }
};

export const completeBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await getBookingById({ id: req.body.bookingId });
    if (booking.status !== BookingStatus.PAID)
      return next(new ValidationError('The booking is not paid'));

    const bookingUpdated = await updateBooking(
      {
        id: req.body.bookingId,
      },
      {
        status: BookingStatus.COMPLETED,
      }
    );

    res.status(200).json({
      status: 'success',
      data: bookingUpdated,
    });
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when completing the booking'
      )
    );
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await getBookingById({ id: req.body.bookingId });

    if (
      booking.status === BookingStatus.CANCELED ||
      booking.status === BookingStatus.COMPLETED
    )
      return next(
        new ValidationError(
          `The booking is already ${booking.status.toLowerCase()}, it cannot be canceled`
        )
      );
    if (booking.status === BookingStatus.ABSEND)
      return next(
        new ValidationError(
          'It seems that you were absent on the day of the tour, soon our team will contact you to resolve your situation'
        )
      );

    const bookingUpdated = await updateBooking(
      {
        id: req.body.bookingId,
      },
      {
        status: BookingStatus.CANCELED,
      }
    );

    res.status(200).json({
      status: 'success',
      data: bookingUpdated,
    });
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when completing the booking'
      )
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
