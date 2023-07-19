import { Router } from 'express';
import {
  createTourEventHandler,
  createTourHandler,
  getAllToursHandler,
  getTourHandler,
} from '../controllers/tour.controller';

const router = Router();

router
  .post('/', createTourHandler)
  .get('/', getAllToursHandler)
  .get('/:id', getTourHandler)
  .post('/:id/winery', createTourEventHandler);

export default router;
