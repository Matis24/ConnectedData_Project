// Import dependencies
import http from 'http';
import { getPlantNetSpecies } from './services/PlantNetAPI.js';
import { mistralAPI } from './services/MistralAPI.js';
import { config } from 'dotenv';
config();


// Launch the server
const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  try{

    //APIs Keys 
    const api_key_plantnet = process.env.API_KEY_PLANTNET;
    const api_key_mistral = process.env.API_KEY_MISTRAL;


    //Call the function to get the data from PlantNet
    const data = await getPlantNetSpecies(api_key_plantnet);
    const species = data[0]
    //const species = data.slice(0, 10);
    //const commonNames = species[0].commonNames;

    // Mistral 
    //const question = "Dis moi en plus sur l'espèce" + commonNames.join(", ") + "?";
    //const mistralres = await mistralAPI(api_key_mistral,question);

    // Send response

    res.end(JSON.stringify({
      //message: mistralres,
      species: species,
      //commonNames: commonNames
    }));
  }

  catch (error){
    console.error("Error",error);
    res.end ("Error")
  }

});

const port = 2000;

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});
