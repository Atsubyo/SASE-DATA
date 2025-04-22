import http from 'http';
import app from './app';
import config from './config/config';
import dotenv from 'dotenv';

dotenv.config();
console.log("hello");

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});