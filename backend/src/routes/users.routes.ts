import { Router } from 'express';
import { createUserSchema } from '../schemas/user.schema';
import { validate } from '../middlewares/validate';
import { createUserHandler } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', validate(createUserSchema), createUserHandler);

export default router;
