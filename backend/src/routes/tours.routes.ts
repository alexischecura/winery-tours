import { Router } from 'express';
import {
  createTourHandler,
  getAllToursHandler,
  getTourHandler,
} from '../controllers/tour.controller';

const router = Router();

router
  .post('/', createTourHandler)
  .get('/', getAllToursHandler)
  .get('/:id', getTourHandler);

export default router;
