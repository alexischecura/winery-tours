import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { InternalServerError, ValidationError } from '../utils/AppError';

export const validateBody =
  (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fields = error.errors.map((err: z.ZodIssue) => ({
          [err.path.at(0) || 'error']: {
            message: err.message,
          },
        }));
        next(
          new ValidationError('Error validating the data from body', fields)
        );
      }
      next(
        new InternalServerError('Something went wrong when validation the body')
      );
    }
  };

export const validateParams =
  (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err: z.ZodIssue) => ({
          field: err.path.at(0),
          message: err.message,
        }));
        next(
          new ValidationError('Error validating the data from params', errors)
        );
      }
      next(
        new InternalServerError(
          'Something went wrong when validation the params'
        )
      );
    }
  };
