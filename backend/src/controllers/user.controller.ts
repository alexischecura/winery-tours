import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../utils/AppError';

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user)
      return next(
        new AuthenticationError("Session has expired or user doesn't exist")
      );

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
