import { Router } from 'express';
import {
  changeRoleSchema,
  codeParamsSchema,
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
} from '../schemas/user.schema';
import { validateBody, validateParams } from '../schemas/validators';
import {
  authenticateUser,
  changeRole,
  createUserHandler,
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  resetPasswordHandler,
  restrictTo,
  verifyEmailHandler,
} from '../controllers/users/auth.controller';
import {
  getCurrentUser,
  createBookingHandler,
} from '../controllers/users/user.controller';

const router = Router();

router.post('/signup', validateBody(createUserSchema), createUserHandler);
router.get(
  '/verification/:code',
  validateParams(codeParamsSchema),
  verifyEmailHandler
);
router.post('/login', validateBody(loginUserSchema), loginUserHandler);
router.post('/refresh', refreshAccessTokenHandler);
router.post(
  '/forgotPassword',
  validateBody(forgotPasswordSchema),
  forgotPasswordHandler
);
router.post(
  '/resetPassword/:code',
  validateParams(codeParamsSchema),
  validateBody(resetPasswordSchema),
  resetPasswordHandler
);

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
