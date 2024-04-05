// Import dependencies
import http from 'http';
import app from './app.js';


// Launch the server
const server = http.createServer(app)

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 5000;

server.listen(port);

server.on('listening', () => {
  const adress = server.address();
  console.log(`Server running on http://localhost:${adress.port}/species`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
});
