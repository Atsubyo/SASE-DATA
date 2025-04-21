import http from 'http';
import app from './app';
import config from './config/config';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});