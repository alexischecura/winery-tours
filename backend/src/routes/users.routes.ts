import { Router } from 'express';
import {
  changeRoleSchema,
  createBookingSchema,
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  tokenParamsSchema,
} from '../schemas/user.schema';
import { validateBody, validateParams } from '../schemas/validators';
import {
  authenticateUser,
  createUserHandler,
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  resetPasswordHandler,
  restrictTo,
  verifyEmailHandler,
} from '../controllers/auth';
import {
  changeRole,
  createBookingHandler,
  getAllUserBookings,
  getCurrentUser,
} from '../controllers/users/user.controller';

const router = Router();

// Sign Up User
router
  .post('/signup', validateBody(createUserSchema), createUserHandler)
  .get(
    '/verification/:token',
    validateParams(tokenParamsSchema),
    verifyEmailHandler
  );

// Login User
router
  .post('/login', validateBody(loginUserSchema), loginUserHandler)
  .post('/refresh', refreshAccessTokenHandler);

// Password Forgot
router
  .post(
    '/forgotPassword',
    validateBody(forgotPasswordSchema),
    forgotPasswordHandler
  )
  .patch(
    '/resetPassword/:token',
    validateParams(tokenParamsSchema),
    validateBody(resetPasswordSchema),
    resetPasswordHandler
  );

//Autenticated Routes
router.use(authenticateUser);
router
  .post('/logout', logoutUserHandler)
  .get('/me', getCurrentUser)
  .post('/bookings', validateBody(createBookingSchema), createBookingHandler)
  .get('/bookings', getAllUserBookings);

// Change Role
router.post(
  '/role',
  restrictTo('ADMIN'),
  validateBody(changeRoleSchema),
  changeRole
);
export default router;
