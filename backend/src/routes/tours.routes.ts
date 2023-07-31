import { Router } from 'express';
import {
  createTourEventHandler,
  createTourHandler,
  getAllToursHandler,
  getTourHandler,
} from '../controllers/tours/tour.controller';
import { validateBody } from '../schemas/validators';
import {
  createTourEventSchema,
  createTourSchema,
} from '../schemas/tour.schema';
import { authenticateUser, restrictTo } from '../controllers/auth';

export const router = Router();

router.get('/', getAllToursHandler).get('/:id', getTourHandler);

router.use(authenticateUser);
router.use(restrictTo('ADMIN'));
router
  .post('/', validateBody(createTourSchema), createTourHandler)
  .post(
    '/createEvent',
    validateBody(createTourEventSchema),
    createTourEventHandler
  );

export default router;
