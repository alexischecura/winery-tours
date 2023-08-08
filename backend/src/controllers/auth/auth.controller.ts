import { NextFunction, Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { getUser } from '../../services/user.service';
import {
  AuthenticationError,
  AuthorizationError,
  InternalServerError,
} from '../../utils/AppError';
import { verifyJwt } from '../../utils/jwtUtils';
import { redisClient } from '../../databases/redis.db';

// Route Restriction Depending on User Role
export const restrictTo =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) return next(new AuthenticationError('Session has expired'));

    if (!roles.includes(user.role)) {
      return next(
        new AuthorizationError(
          'You do not have permission to perform this action'
        )
      );
    }
    next();
  };

// Verificate Authentication
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ').at(1);
    }
    if (!access_token)
      return next(new AuthenticationError('You are not logged.'));

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'ACCESS_TOKEN_PUBLIC_KEY'
    );
    if (!decoded)
      return next(
        new AuthenticationError("Invalid token or user doesn't exist.")
      );

    const session = await redisClient.get(decoded.sub);
    if (!session)
      return next(new AuthenticationError('Invalid token or session expired.'));

    const user = await getUser({ id: JSON.parse(session).id });

    if (!user)
      return next(new AuthenticationError('Invalid token or session expired.'));

    const localUser = {
      fullName: user.fullName,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    res.locals.user = localUser;
    next();
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when authenticating.'));
  }
};
