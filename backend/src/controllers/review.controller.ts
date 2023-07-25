import { NextFunction, Request, Response } from 'express';
import { AuthenticationError, ValidationError } from '../utils/AppError';
import { Prisma } from '@prisma/client';

export const createReviewHandler = async (
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

    // const tour = await getTourInUser({ id: req.params.id });
    // if (!tour) return next(new ValidationError('Tour not found'));

    const newReview: Prisma.ReviewCreateInput = {
      rating: req.body.rating,
      comment: req.body.comment,
      tour: { connect: { id: req.params.id } },
      booking: { connect: { id: req.body.booking } },
      user: { connect: { id: req.body.user } },
    };

    res.status(201).json({
      status: 'success',
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
};
