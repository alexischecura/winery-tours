import { NextFunction, Request, Response } from 'express';
import {
  TourWithWineries,
  createTour,
  createTourEvent,
  getAllTours,
  getTour,
  getTourWithWineries,
} from '../services/tour.service';
import { getWinery } from '../services/winery.service';
import { Prisma, TourEvent } from '@prisma/client';
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '../utils/AppError';

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
    console.error(error);
    next(new InternalServerError('Something went wrong creating the tour'));
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
    console.error(error);
    next(new InternalServerError('Something went wrong getting the tours'));
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
      return next(
        new NotFoundError(`Tour with the id: ${req.params.id} not found`)
      );
    }

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong getting the tour'));
  }
};

export const createTourEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tour: TourWithWineries = await getTourWithWineries({
      id: req.params.id,
    });

    if (!tour) {
      return next(
        new NotFoundError(
          `Tour with the id ${req.params.id} was not found: The event was not created`
        )
      );
    }

    const winery = await getWinery({ id: req.body.wineryId });

    if (!winery) {
      return next(
        new NotFoundError(
          `Winery with the id ${req.body.wineryId} was not found: The event was not created`
        )
      );
    }

    const wineriesIdsInTour = tour.wineries.map(
      (event: TourEvent) => event.wineryId
    );

    if (wineriesIdsInTour.includes(req.body.wineryId)) {
      return next(
        new ValidationError(
          `Winery with the id ${req.body.wineryId} is alredy include in the Tour`
        )
      );
    }

    const newTourEvent: Prisma.TourEventCreateInput = {
      day: req.body.day,
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
    console.error(error);
    next(
      new InternalServerError('Something went wrong creating the tour event')
    );
  }
};
