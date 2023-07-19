import express from 'express';
import wineriesRouter from './routes/wineries.routes';

const app = express();
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/wineries', wineriesRouter);

export default app;
