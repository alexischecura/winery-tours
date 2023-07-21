import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { envVars } from './configs/env.config';
import { NotFoundError } from './utils/AppError';
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

// Routes
app.use('/api/v1/wineries', wineriesRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.all('*', (req, _, next) => {
  next(new NotFoundError(req.originalUrl));
});

// Global errors handler
app.use(globalErrorHandler);

export default app;
