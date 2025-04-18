import express from 'express';

import registerRouter from './routes/register';
import attendanceRouter from './routes/attendance';
import userRouter from './routes/users';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/register', registerRouter);
app.use('/attendance', attendanceRouter);
app.use('/user', userRouter);

// Global error Handler (should be after routes)
app.use(errorHandler);

export default app;
