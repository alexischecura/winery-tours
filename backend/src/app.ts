import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { envVars } from './configs/env.config';
import { NotFoundError, RateLimitError } from './utils/AppError';
import globalErrorHandler from './controllers/error.controller';
import wineriesRouter from './routes/wineries.routes';
import toursRouter from './routes/tours.routes';
import usersRouter from './routes/users.routes';

// Global Middlewares
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.ORIGIN,
    credentials: true,
  })
);

if (envVars.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// HTTP Headers Security
app.use(helmet());

// Limit requests
const limiter = rateLimit({
  max: 5,
  handler: () => {
    throw new RateLimitError(
      `Too many request from this IP, try again in ${envVars.RATE_LIMIT_TIME_IN_SECONDS} seconds`
    );
  },
  windowMs: envVars.RATE_LIMIT_TIME_IN_SECONDS * 1000,
});
app.use(limiter);

// Routes
app.use('/api/v1/wineries', wineriesRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.get('api/v1/test', (_, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the winery-tours API',
  });
});
app.all('*', (req, _, next) => {
  next(new NotFoundError(req.originalUrl));
});

// Global errors handler
app.use(globalErrorHandler);

export default app;
