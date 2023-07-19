import { NextFunction, Request, Response } from 'express';
import { createWinery } from '../services/winery.service';

export const createWineryHandle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newWinery = {
    name: req.body.name,
    description: req.body.description,
    imageCover: req.body.imageCover,
    images: req.body.images,
    address: req.body.address,
    coordinates: req.body.coordinates,
  };
  console.log(newWinery);
  const winery = await createWinery(newWinery);

  res.status(200).json({
    status: 'success',
    winery,
  });
};
