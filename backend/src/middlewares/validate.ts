import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/AppError';

type SchemaType<T> = {
  body?: T;
  query?: T;
  params?: T;
};

export const validate =
  <T>(schema: z.Schema<T>) =>
  (req: Request<SchemaType<T>>, res: Response, next: NextFunction) => {
    try {
      const data = req.body || req.query || req.params;

      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.at(0),
          message: err.message,
        }));

        next(new ValidationError('Error validating the data', errors));
      }
      next(error);
    }
  };
