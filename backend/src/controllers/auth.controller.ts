import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { envVars } from '../configs/env.config';
import { CreateUserType, LoginUser } from '../schemas/user.schema';
import { createUser, getUser, signTokens } from '../services/user.service';
import {
  AuthenticationError,
  ConflictError,
  InternalServerError,
} from '../utils/AppError';

// Cookies Configurations

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

// Create a new User
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // Code'P2002' is when there are a conflict in a unique field in prisma.
      return next(new ConflictError('Email already exists'));
    }
    next(new InternalServerError('Something went wrong.'));
  }
};

// Login an User
export const loginUserHandler = async (
  req: Request<{}, {}, LoginUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // Get the user
    const user = await getUser(
      { email: email.toLowerCase() },
      { id: true, email: true, password: true }
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AuthenticationError('Incorrect email or password'));
    }

    const { access_token, refresh_token } = await signTokens(user);

    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
  } catch (error) {
    next(new InternalServerError('Something went wrong.'));
  }
};
