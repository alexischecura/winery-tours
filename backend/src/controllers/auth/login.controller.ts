import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { envVars } from '../../configs/env.config';
import { LoginUser } from '../../schemas/user.schema';
import { getUser, signTokens } from '../../services/user.service';
import {
  AuthenticationError,
  AuthorizationError,
  InternalServerError,
} from '../../utils/AppError';
import { signJwt, verifyJwt } from '../../utils/jwtUtils';
import { redisClient } from '../../databases/redis.db';

// Cookies Configurations
const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (envVars.NODE_ENV === 'production') cookiesOptions.secure = true;

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessTokenCookieOptions: CookieOptions = {
      ...cookiesOptions,
      expires: new Date(Date.now() + envVars.ACCESS_TOKEN_EXPIRES * 60 * 1000),
    };

    const refreshTokenCookieOptions: CookieOptions = {
      ...cookiesOptions,
      expires: new Date(Date.now() + envVars.REFRESH_TOKEN_EXPIRES * 60 * 1000),
    };

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

    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (error) {
    console.error(error);
    next(new InternalServerError('Something went wrong when logging in'));
  }
};

// Refreshing the token (Create and Send Access Token with)
export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = 'Failed to refresh access token, please login again.';

  try {
    const accessTokenCookieOptions: CookieOptions = {
      ...cookiesOptions,
      expires: new Date(Date.now() + envVars.ACCESS_TOKEN_EXPIRES * 60 * 1000),
    };

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

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (error) {
    console.error(error);
    next(
      new InternalServerError('Something went wrong when refreshing the token.')
    );
  }
};
