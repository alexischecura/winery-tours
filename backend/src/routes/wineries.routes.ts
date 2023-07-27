import { Router } from 'express';
import {
  createWineryHandler,
  getAllWineriesHandler,
  getWineryHandler,
} from '../controllers/winery.controller';
import { validateBody } from '../schemas/validators';
import { winerySchema } from '../schemas/winery.schema';
import { authenticateUser, restrictTo } from '../controllers/auth.controller';

const router = Router();

router.use(authenticateUser);
router.post(
  '/',
  restrictTo('ADMIN'),
  validateBody(winerySchema),
  createWineryHandler
);
router.get('/', getAllWineriesHandler);
router.get('/:id', getWineryHandler);

export default router;
