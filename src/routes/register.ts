import { Router } from 'express';
import { registerEvent } from '../controllers/registerController';

const router = Router();

router.post('/', registerEvent);

export default router;
