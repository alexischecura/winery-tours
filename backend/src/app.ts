import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import wineriesRouter from './routes/wineries.routes';
import toursRouter from './routes/tours.routes';
import { envVars } from './configs/env.config';

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

export default app;
