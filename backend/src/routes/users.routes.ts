import { Router } from 'express';

import { validateBody, validateParams } from '../schemas/validators';
import {
  changeRoleSchema,
  createBookingSchema,
  createReviewSchema,
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  tokenParamsSchema,
} from '../schemas/user.schema';
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
  getCurrentUser,
} from '../controllers/users/user.controller';
import {
  cancelBooking,
  completeBooking,
  createBookingHandler,
  getAllUserBookings,
  payBooking,
} from '../controllers/users/booking.controller';
import { createReviewHandler } from '../controllers/users/review.controller';

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
router.post('/logout', logoutUserHandler).get('/me', getCurrentUser);

//Booking routes
router
  .post('/bookings', validateBody(createBookingSchema), createBookingHandler)
  .get('/bookings', getAllUserBookings)
  .post('/bookings/pay', payBooking)
  .post('/bookings/complete', completeBooking)
  .post('/bookings/cancel', cancelBooking);

//Review Routes
router.post('/reviews', validateBody(createReviewSchema), createReviewHandler);

// Change Role
router.post(
  '/role',
  restrictTo('ADMIN'),
  validateBody(changeRoleSchema),
  changeRole
);
export default router;
