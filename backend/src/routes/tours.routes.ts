import { Router } from 'express';
import {
  createTourEventHandler,
  createTourHandler,
  getAllToursHandler,
  getTourHandler,
} from '../controllers/tours/tour.controller';
import { validateBody } from '../schemas/validators';
import { createTourSchema } from '../schemas/tour.schema';

export const router = Router();

router
  .post('/', validateBody(createTourSchema), createTourHandler)
  .get('/', getAllToursHandler)
  .get('/:id', getTourHandler)
  .post('/:id/winery', createTourEventHandler);

export default router;
