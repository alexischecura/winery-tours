import { NextFunction, Request, Response } from 'express';
import {
  createTour,
  createTourEvent,
  getAllTours,
  getTour,
} from '../services/tour.service';
import { getWinery } from '../services/winery.service';
import { Prisma } from '@prisma/client';

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

export const createTourEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tour = await getTour({ id: req.params.id });

    if (!tour) {
      res.status(400).json({
        status: 'fail',
        message: 'Tour not found: The event was not created',
      });
      next();
    }

    const winery = await getWinery({ id: req.body.wineryId });

    if (!winery) {
      res.status(400).json({
        status: 'fail',
        message: 'Winery not found: The event was not created',
      });
      next();
    }

    const newTourEvent: Prisma.TourEventCreateInput = {
      day: +req.body.day,
      specialEvent: req.body.specialEvent,
      winery: { connect: { id: req.body.wineryId } },
      tour: { connect: { id: req.params.id } },
    };

    const tourEvent = await createTourEvent(newTourEvent);

    res.status(201).json({
      status: 'success',
      data: tourEvent,
    });
  } catch (error) {
    next(error);
  }
};
