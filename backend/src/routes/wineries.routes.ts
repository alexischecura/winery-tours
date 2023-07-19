import { Router } from 'express';
import { createWineryHandle } from '../controllers/winery.controller';

const router = Router();

router.post('/', createWineryHandle);

export default router;
