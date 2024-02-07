// Library needed
const http = require('http');

// Launch the server
const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  try{
    // Function to get the data with API of PlantNet
    async function firstAPI(){
      const response = await fetch("https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json");
      const data = await response.json();
      return data;
    };

    // Wait for the API response and stock it in a variable
    const data = await firstAPI();
    
    const message = JSON.stringify(data.movies[0]);

    // Send response
    res.end(message);
  }
  catch (error){
    console.error("Error",error);
    res.end ("Error")
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
