import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/AppError';

export const validateBody =
  (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err: z.ZodIssue) => ({
          field: err.path.at(0),
          message: err.message,
        }));
        next(new ValidationError('Error validating the data', errors));
      }
      next(error);
    }
  };
