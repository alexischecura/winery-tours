import { Router } from 'express';
import {
  createWineryHandler,
  getAllWineriesHandler,
  getWineryHandler,
} from '../controllers/winery.controller';
import { validateBody } from '../schemas/validators';
import { winerySchema } from '../schemas/winery.schema';

const router = Router();

router.post('/', validateBody(winerySchema), createWineryHandler);
router.get('/', getAllWineriesHandler);
router.get('/:id', getWineryHandler);

export default router;
