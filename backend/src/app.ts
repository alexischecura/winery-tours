import express from 'express';
import wineriesRouter from './routes/wineries.routes';
import toursRouter from './routes/tours.routes';

const app = express();
app.use(express.json({ limit: '10kb' }));

// Configuring Routes
app.use('/api/v1/wineries', wineriesRouter);
app.use('/api/v1/tours', toursRouter);

export default app;
