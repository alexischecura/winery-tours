import { Router } from 'express';
import {
  createWineryHandler,
  getAllWineriesHandler,
  getWineryHandler,
} from '../controllers/winery.controller';

const router = Router();

router.post('/', createWineryHandler);
router.get('/', getAllWineriesHandler);
router.get('/:id', getWineryHandler);

export default router;
