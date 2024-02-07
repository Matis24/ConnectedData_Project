// Creation of the servor
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  // Data we want to see
  const message = 'Bonjour, ceci est un serveur local!';
  // Send response
  res.end(message);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
