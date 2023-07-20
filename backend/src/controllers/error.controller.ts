import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    const { statusCode, status, message, code, description } = error;

    // Send status code and error message to the client
    res.status(statusCode).json({
      status,
      code,
      message,
      description,
    });
  } else {
    // Unknown errors
    console.error('Unknown error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

export default globalErrorHandler;
