import { Router } from 'express';
import {
  changeRoleSchema,
  createUserSchema,
  loginUserSchema,
  verifyEmailSchema,
} from '../schemas/user.schema';
import { validateBody, validateParams } from '../schemas/validators';
import {
  authenticateUser,
  changeRole,
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  restrictTo,
  verifyEmailHandler,
} from '../controllers/auth.controller';
import {
  getCurrentUser,
  createBookingHandler,
} from '../controllers/user.controller';

const router = Router();

router.post('/signup', validateBody(createUserSchema), createUserHandler);
router.get(
  '/verification/:verificationCode',
  validateParams(verifyEmailSchema),
  verifyEmailHandler
);
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
