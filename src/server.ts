import http from 'http';
import app from './app';
import config from './config/config';

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
