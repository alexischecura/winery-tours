import { Router } from 'express';
import {
  changeRoleSchema,
  createUserSchema,
  loginUserSchema,
} from '../schemas/user.schema';
import { validateBody } from '../schemas/validators';
import {
  authenticateUser,
  changeRole,
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  restrictTo,
} from '../controllers/auth.controller';
import {
  getCurrentUser,
  createBookingHandler,
} from '../controllers/user.controller';

const router = Router();

router.post('/signup', validateBody(createUserSchema), createUserHandler);
router.post('/login', validateBody(loginUserSchema), loginUserHandler);
router.post('/refresh', refreshAccessTokenHandler);

//Autenticated Routes
router.use(authenticateUser);
router.post('/logout', logoutUserHandler);
router.get('/me', getCurrentUser);
router.post('/tour/book', createBookingHandler);

router.post(
  '/role',
  restrictTo('ADMIN'),
  validateBody(changeRoleSchema),
  changeRole
);
export default router;
