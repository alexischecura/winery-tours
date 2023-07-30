import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Prisma, UserRole } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { envVars } from '../configs/env.config';
import { CreateUserType, LoginUser } from '../schemas/user.schema';
import {
  createUser,
  getUser,
  signTokens,
  updateUser,
} from '../services/user.service';
import {
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '../utils/AppError';
import Email from '../utils/Email';
import { signJwt, verifyJwt } from '../utils/jwtUtils';
import { redisClient } from '../databases/redis.db';

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

    const hashedPassword = await bcrypt.hash(password, 12);

    const verifyCode = crypto.randomBytes(32).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

    // Create new user
    const newUser = await createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationCode,
    });

    const verificationUrl = `${envVars.ORIGIN}/api/v1/users/verification/${verifyCode}`;
    try {
      await new Email(newUser, verificationUrl).sendVerificationCode();
      await updateUser({ id: newUser.id }, { verificationCode });
    } catch (error) {
      return new InternalServerError(
        'There was an error sending the verification email. Please try again later.'
      );
    }

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
      .update(req.params.verificationCode)
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

// Login an User
export const loginUserHandler = async (
  req: Request<{}, {}, LoginUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Body types verification done in routes
    const { email, password } = req.body;

    // Get the user
    const user = await getUser(
      { email: email.toLowerCase() },
      { id: true, email: true, password: true, verified: true }
    );

    if (!user) {
      return next(new AuthenticationError('Incorrect email or password'));
    }
    if (!user.verified) {
      return next(new AuthorizationError('Please verify your email'));
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return next(new AuthenticationError('Incorrect email or password'));
    }

    const { access_token, refresh_token } = await signTokens(user);

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when logging in'));
  }
};

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
      return next(new AuthenticationError('You are not logged'));

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'ACCESS_TOKEN_PUBLIC_KEY'
    );
    if (!decoded)
      return next(
        new AuthenticationError("Invalid token or user doesn't exist")
      );

    const session = await redisClient.get(decoded.sub);
    if (!session)
      return next(new AuthenticationError('Invalid token or session expired'));

    const user = await getUser({ id: JSON.parse(session).id });

    if (!user)
      return next(new AuthenticationError('Invalid token or session expired'));

    const localUser = {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };
    res.locals.user = localUser;
    next();
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when authenticating'));
  }
};

// Refreshing the token (Create and Send Access Token with)
export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = 'Failed to refresh access token, please login again';

  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) return next(new AuthorizationError(errorMessage));

    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'REFRESH_TOKEN_PUBLIC_KEY'
    );
    if (!decoded) return next(new AuthorizationError(errorMessage));
    const session = await redisClient.get(decoded.sub);
    if (!session) return next(new AuthorizationError(errorMessage));

    const user = await getUser({ id: JSON.parse(session).id });
    if (!user) return next(new AuthorizationError(errorMessage));

    const access_token = signJwt({ sub: user.id }, 'ACCESS_TOKEN_PRIVATE_KEY', {
      expiresIn: `${envVars.ACCESS_TOKEN_EXPIRES}m`,
    });

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when refreshing the token')
    );
  }
};

// Delete user session
export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await redisClient.del(res.locals.user.id);
    res.cookie('access_token', '', { maxAge: -1 });
    res.cookie('refresh_token', '', { maxAge: -1 });
    res.cookie('logged_in', '', { maxAge: -1 });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when logging out'));
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
          `The user with the id ${req.body.userId} was not found`
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
      message: `The user ${userWithNewRole.email} now have the role of ${userWithNewRole.role}`,
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when chaging the role'));
  }
};
