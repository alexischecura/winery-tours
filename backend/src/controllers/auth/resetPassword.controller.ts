import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getUser, updateUser } from '../../services/user.service';
import {
  AuthorizationError,
  InternalServerError,
  NotFoundError,
} from '../../utils/AppError';
import { invalidateSession } from './logout.controller';
import { envVars } from '../../configs/env.config';
import Email from '../../utils/Email';

// Send reset password link to user email
export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser({ email: req.body.email.toLowerCase() });

    if (!user) {
      return next(
        new NotFoundError('There is no user with that email address.')
      );
    }

    if (!user.verified) {
      return next(new AuthorizationError('Please verify your email.'));
    }

    if (user.provider) {
      return next(
        new AuthorizationError(
          `Please use your social accound to login (${user.provider}).`
        )
      );
    }
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await updateUser(
      {
        id: user.id,
      },
      {
        passwordResetToken,
        passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
      }
    );
    try {
      const url = `${envVars.ORIGIN}/api/v1/users/resetPassword/${resetToken}`;

      await new Email(user, url).sendPasswordResetToken();

      res.status(200).json({
        status: 'success',
        message: 'You will receive an email to reset your password.',
      });
    } catch (error) {
      await updateUser(
        {
          id: user.id,
        },
        {
          passwordResetToken: null,
          passwordResetExpires: null,
        }
      );
      console.error(error);
      return next(
        new InternalServerError(
          'Something went wrong when sending the email to reset your password.'
        )
      );
    }
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when handling the forgot password.'
      )
    );
  }
};

//Reset the password
export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await getUser({
      passwordResetToken,
      passwordResetExpires: {
        gt: new Date(),
      },
    });
    if (!user)
      return next(new AuthorizationError('Token is invalid or has expired.'));

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await updateUser(
      { id: user.id },
      {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      }
    );
    await invalidateSession(res, user.id);

    res.status(202).json({
      status: 'success',
      message: 'Your password was successfully updated',
    });
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when handling the reset password.'
      )
    );
  }
};
