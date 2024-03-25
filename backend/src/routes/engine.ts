import {ByQueryId, Start, Track, Validation} from '@/middlewares/validations';
import express, {Router} from 'express';

import controller from '@/controller';
import { verifyToken } from '@/middlewares';

const router: Router = express.Router();

router.post('/start', verifyToken,Validation(Start), controller.Engine.Start);
router.get('/result',verifyToken, Validation(ByQueryId), controller.Engine.Result);
router.get('/status',verifyToken,Validation(ByQueryId), controller.Engine.Status);
router.put('/track/:action', verifyToken, Validation(Track), controller.Engine.Track);

export default router;