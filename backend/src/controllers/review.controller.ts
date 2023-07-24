import { NextFunction, Request, Response } from 'express';
import { getTourInUser } from '../services/tour.service';
import { ValidationError } from '../utils/AppError';
import { getWinery } from '../services/winery.service';
import { Prisma } from '@prisma/client';

/*
  1. Verify

*/

export const createReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get the tour in the user table
    const tour = await getTourInUser({ id: req.params.id });
    if (!tour) return next(new ValidationError('Tour not found'));

    const newReview: Prisma.ReviewCreateInput = {
      rating: req.body.rating,
      comment: req.body.comment,
      tour: { connect: { id: req.params.id } },
      user: { connect: { id: req.body.user } },
    };

    // const tourEvent = await createTourEvent(newTourEvent);

    res.status(201).json({
      status: 'success',
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
};
