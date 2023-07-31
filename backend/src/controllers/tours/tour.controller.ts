import { NextFunction, Request, Response } from 'express';
import {
  TourWithEvets,
  createTour,
  createTourEvent,
  getAllTours,
  getTour,
  getTourWithEvents,
} from '../../services/tour.service';
import { getWinery } from '../../services/winery.service';
import { Prisma, TourEvent } from '@prisma/client';
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '../../utils/AppError';

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
    next(
      new InternalServerError('Something went wrong when creating the tour')
    );
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
    next(
      new InternalServerError('Something went wrong when getting the tours')
    );
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
    next(new InternalServerError('Something went wrong when getting the tour'));
  }
};

export const createTourEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tourId, wineryId, day, specialEvent } = req.body;

  try {
    const tour: TourWithEvets = await getTourWithEvents({
      id: tourId,
    });

    if (!tour) {
      return next(
        new NotFoundError(
          `Tour with the id ${tourId} was not found, the event was not created`
        )
      );
    }

    const winery = await getWinery({ id: wineryId });

    if (!winery) {
      return next(
        new NotFoundError(
          `Winery with the id ${wineryId} was not found, the event was not created`
        )
      );
    }

    const wineriesIdsInTour = tour.tourEvents.map(
      (event: TourEvent) => event.wineryId
    );

    if (wineriesIdsInTour.includes(wineryId)) {
      return next(
        new ValidationError(
          `Winery with the id ${wineryId} already is in an event in the tour`
        )
      );
    }

    const newTourEvent: Prisma.TourEventCreateInput = {
      day,
      specialEvent,
      winery: { connect: { id: wineryId } },
      tour: { connect: { id: tourId } },
    };

    const tourEvent = await createTourEvent(newTourEvent);

    res.status(201).json({
      status: 'success',
      data: tourEvent,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError(
        'Something went wrong when creating the tour event'
      )
    );
  }
};
