import { Router } from 'express';
import { createUserSchema } from '../schemas/user.schema';
import { validateBody } from '../middlewares/validators';
import { createUserHandler } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', validateBody(createUserSchema), createUserHandler);

export default router;
