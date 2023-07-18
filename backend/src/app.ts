import express, { Response } from 'express';

const app = express();

app.get('/test', async (_, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server running',
  });
});

export default app;
