import { Router } from 'express';
import { getAttendance } from '../controllers/attendanceController';

const router = Router();

router.get('/', getAttendance);

export default router;
