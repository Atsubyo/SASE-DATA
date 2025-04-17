import { Router } from 'express';
import { getUser, addUser, deleteUser } from '../controllers/usersController';

const router = Router();

router.get('/', getUser);
router.get('/add', addUser);
router.get('/delete', deleteUser);

export default router;
