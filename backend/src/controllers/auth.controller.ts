import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { envVars } from '../configs/env.config';
import { CreateUserType } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import AppError from '../utils/AppError';
import { Prisma } from '@prisma/client';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (envVars.NODE_ENV === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + envVars.ACCESS_TOKEN_EXPIRES * 60 * 1000),
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + envVars.REFRESH_TOKEN_EXPIRES * 60 * 1000),
};

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, photo } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      photo,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          photo: newUser.photo,
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // Code'P2002' is when there are a conflict in a unique field.
      return res.status(409).json({
        status: 'error',
        message: 'Email already exists',
      });
    }
    next(new AppError('Something went wrong', 500));
  }
};
