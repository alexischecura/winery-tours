import { NextFunction, Request, Response } from 'express';
import { createTour } from '../services/tour.service';

export const createTourHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTour = {
      name: req.body.name,
      duration: req.body.duration,
      maxGroupSize: req.body.maxGroupSize,
      price: req.body.price,
      priceDiscount: req.body.priceDiscount,
      summary: req.body.summary,
      description: req.body.description,
      imageCover: req.body.imageCover,
      startDates: req.body.startDates,
    };

    console.log(newTour);

    const tour = await createTour(newTour);

    res.status(201).json({
      status: 'success',
      tour,
    });
  } catch (err) {
    throw err;
  }
};
