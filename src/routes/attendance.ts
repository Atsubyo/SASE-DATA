import { Router } from 'express';
import { getAttendance, hello } from '../controllers/attendanceController';

const router = Router();

router.get('/hello', hello);
router.get('/:uin', getAttendance);

export default router;
