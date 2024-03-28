// Import dependencies
import http from 'http';
import app from './app.js';


// Launch the server
const server = http.createServer(app)

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

server.listen(port);

server.on('listening', () => {
  const adress = server.address();
  console.log(`Server running on http://localhost:${adress.port}`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
});

    //APIs Keys 
    //const api_key_plantnet = process.env.API_KEY_PLANTNET;
    //const api_key_mistral = process.env.API_KEY_MISTRAL;


    //Call the function to get the data from PlantNet

    //const species = data.slice(0, 10);
    //const commonNames = species[0].commonNames;

    // Mistral 
    //const question = "Dis moi en plus sur l'espèce" + commonNames.join(", ") + "?";
    //const mistralres = await mistralAPI(api_key_mistral,question);



