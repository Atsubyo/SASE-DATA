// routes/time.ts
import { Router, Request, Response } from 'express';
import moment from 'moment-timezone';

const router = Router();

router.get('/time', (_req: Request, res: Response) => {
    const serverTime = moment().tz('America/Chicago').format();
    res.status(200).json({ time: serverTime });
});

export default router;
