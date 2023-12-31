import { NextFunction, Request, Response } from 'express';
import {
  createWinery,
  getAllWineries,
  getWinery,
} from '../../services/winery.service';
import { InternalServerError } from '../../utils/AppError';

export const createWineryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newWinery = {
      name: req.body.name,
      description: req.body.description,
      imageCover: req.body.imageCover,
      images: req.body.images,
      address: req.body.address,
      coordinates: req.body.coordinates,
    };
    const winery = await createWinery(newWinery);

    res.status(201).json({
      status: 'success',
      winery,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when creating the winery')
    );
  }
};

export const getAllWineriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wineries = await getAllWineries();

    res.status(200).json({
      status: 'success',
      data: wineries,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when getting the wineries')
    );
  }
};

export const getWineryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const winery = await getWinery({ id: req.params.id });

    if (!winery) {
      res.status(404).json({
        status: 'fail',
        message: 'Winery not found',
      });
      next();
    }

    res.status(200).json({
      status: 'success',
      winery,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when getting the winery')
    );
  }
};
