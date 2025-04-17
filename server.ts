import express from 'express';
import bodyParser from 'body-parser';
import config from './src/config/config';

import registerRouter from './src/routes/register';
import attendanceRouter from './src/routes/attendance';
import userRouter from './src/routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/register', registerRouter);
app.use('/attendance', attendanceRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${config.port}`);
});
