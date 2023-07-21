import { Router } from 'express';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import { validateBody } from '../schemas/validators';
import {
  createUserHandler,
  loginUserHandler,
} from '../controllers/auth.controller';

const router = Router();

router.post('/signup', validateBody(createUserSchema), createUserHandler);
router.post('/login', validateBody(loginUserSchema), loginUserHandler);

export default router;
