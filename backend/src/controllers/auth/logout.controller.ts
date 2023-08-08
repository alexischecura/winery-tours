import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../../databases/redis.db';
import { InternalServerError } from '../../utils/AppError';

export const invalidateSession = async (res: Response, userId?: string) => {
  if (userId) await redisClient.del(userId);
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
};

// Close user session or sessions
export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user?.id;

    const logoutAllSessions = req.query.all === 'true';

    await invalidateSession(res, logoutAllSessions ? undefined : userId);
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when logging out.'));
  }
  res.status(200).json({
    status: 'success',
    message: 'User successfully logged out',
  });
};
