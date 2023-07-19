import { Router } from 'express';
import {
  createWineryHandle,
  getAllWineriesHandle,
  getWineryHandle,
} from '../controllers/winery.controller';

const router = Router();

router.post('/', createWineryHandle);
router.get('/', getAllWineriesHandle);
router.get('/:id', getWineryHandle);

export default router;
