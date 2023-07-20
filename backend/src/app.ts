import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import wineriesRouter from './routes/wineries.routes';
import toursRouter from './routes/tours.routes';
import { envVars } from './configs/env.config';
import AppError from './utils/AppError';

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

// Configuring Routes
app.use('/api/v1/wineries', wineriesRouter);
app.use('/api/v1/tours', toursRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use('*');

export default app;
