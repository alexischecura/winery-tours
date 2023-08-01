import { NextFunction, Request, Response } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
} from '../../utils/AppError';
import { getUser, updateUser } from '../../services/user.service';

// Get current user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user)
      return next(new AuthenticationError('User authentication required'));

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when getting the user'));
  }
};

// Change the role to a user
export const changeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser({ id: req.body.userId });
    if (!user)
      return next(
        new NotFoundError(
          `The user with the id ${req.body.userId} was not found.`
        )
      );

    const userWithNewRole = await updateUser(
      {
        id: req.body.userId,
      },
      {
        role: req.body.role,
      }
    );
    res.status(200).json({
      status: 'success',
      message: `The user ${userWithNewRole.email} now have the role of ${userWithNewRole.role}.`,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when changing the role.')
    );
  }
};
