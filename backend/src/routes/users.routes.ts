import { Router } from 'express';
import {
  changeRoleSchema,
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  tokenParamsSchema,
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
router.post('/login', validateBody(loginUserSchema), loginUserHandler);
router.get(
  '/verification/:token',
  validateParams(tokenParamsSchema),
  verifyEmailHandler
);
router.post('/refresh', refreshAccessTokenHandler);

// Password Forgot routes
router.post(
  '/forgotPassword',
  validateBody(forgotPasswordSchema),
  forgotPasswordHandler
);
router.patch(
  '/resetPassword/:token',
  validateParams(tokenParamsSchema),
  validateBody(resetPasswordSchema),
  resetPasswordHandler
);

//Autenticated Routes
router.use(authenticateUser);
router.post('/logout', loginUserHandler);
router.get('/me', getCurrentUser);
router.post('/tour/book', createBookingHandler);

// Change Role Route
router.post(
  '/role',
  restrictTo('ADMIN'),
  validateBody(changeRoleSchema),
  changeRole
);
export default router;
