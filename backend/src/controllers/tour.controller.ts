import { NextFunction, Request, Response } from 'express';
import { createTour, getAllTours, getTour } from '../services/tour.service';

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

    const tour = await createTour(newTour);

    res.status(201).json({
      status: 'success',
      tour,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllToursHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tours = await getAllTours();

    res.status(200).json({
      status: 'success',
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

export const getTourHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tour = await getTour({ id: req.params.id });

    if (!tour) {
      res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
      next();
    }

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};
