import express from 'express';
import bodyParser from 'body-parser';
import registerRouter from './routes/register'; 
import attendanceRouter from './routes/attendance'; 
import timeRouter from './routes/time';
import userRouter from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', registerRouter);
app.use('/api', attendanceRouter);
app.use('/api', timeRouter);
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
