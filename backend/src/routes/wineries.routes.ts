import { Router } from 'express';
import {
  createWineryHandler,
  getAllWineriesHandler,
  getWineryHandler,
} from '../controllers/tours/winery.controller';
import { validateBody } from '../schemas/validators';
import { winerySchema } from '../schemas/winery.schema';
import {
  authenticateUser,
  restrictTo,
} from '../controllers/auth/auth.controller';

const router = Router();

router.get('/', getAllWineriesHandler).get('/:id', getWineryHandler);

router.use(authenticateUser);
router.use(restrictTo('ADMIN'));
router.post(
  '/',

  validateBody(winerySchema),
  createWineryHandler
);

export default router;
