import express, {Router} from 'express';

import controller from '@/controller';
import { verifyToken } from '@/middlewares';

const router: Router = express.Router();

router.post('/', controller.User.NewUser);
router.get('/me', verifyToken, controller.User.GetMe);

export default router;
