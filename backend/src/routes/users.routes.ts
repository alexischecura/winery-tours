import { Router } from 'express';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import { validateBody } from '../schemas/validators';
import {
  authenticateUser,
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
} from '../controllers/auth.controller';
import { getCurrentUser } from '../controllers/user.controller';

const router = Router();

router.post('/signup', validateBody(createUserSchema), createUserHandler);
router.post('/login', validateBody(loginUserSchema), loginUserHandler);
router.post('/refresh', refreshAccessTokenHandler);
router.post('/logout', authenticateUser, logoutUserHandler);
router.get('/me', authenticateUser, getCurrentUser);

export default router;
