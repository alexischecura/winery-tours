import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { envVars } from '../../configs/env.config';
import { CreateUserType } from '../../schemas/user.schema';
import { createUser, updateUser } from '../../services/user.service';
import {
  AuthenticationError,
  ConflictError,
  InternalServerError,
} from '../../utils/AppError';
import Email from '../../utils/Email';

// Create a new User
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, nationalId, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const verifyCode = crypto.randomBytes(32).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

    // Create new user
    const newUser = await createUser({
      firstName,
      lastName,
      nationalId,
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationCode,
    });

    const verificationUrl = `${envVars.ORIGIN}/api/v1/users/verification/${verifyCode}`;
    try {
      await new Email(newUser, verificationUrl).sendVerificationCode();
    } catch (error) {
      return new InternalServerError(
        'There was an error sending the verification email. Please try again later.'
      );
    }

    res.status(201).json({
      status: 'success',
      message: 'A verification link has been sent to your email account',
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // Code'P2002' is when there are a conflict in a unique field in prisma.
      return next(new ConflictError('Email already exists'));
    }
    console.error(error);
    next(new InternalServerError('Something went wrong when signing in'));
  }
};

// Verify the Email
export const verifyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Params type verification done in routes
    const verificationCode = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await updateUser(
      {
        verificationCode,
      },
      { verified: true, verificationCode: null }
    );

    if (!user) {
      return next(new AuthenticationError('Invalid verification code'));
    }

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error) {
    next(
      new InternalServerError('Something went wrong when verifying the email')
    );
  }
};
