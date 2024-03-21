// Import dependencies
import http from 'http';
import { PlantNetAPI } from './PlantNetAPI.js';
import { mistralAPI } from './MistralAPI.js';
import { config } from 'dotenv';
config();


// Launch the server
const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  try{

    //APIs Keys 
    const api_key_plantnet = process.env.API_KEY_PLANTNET;
    const api_key_mistral = process.env.API_KEY_MISTRAL;

    function getPlantNetSpecies(apiKey) {
      return PlantNetAPI('species', apiKey);
    };

    //Call the function to get the data from PlantNet
    const data = await getPlantNetSpecies(api_key_plantnet);
    const species = data.slice(0, 100);
    const commonNames = species[0].commonNames;

    // const speciesId = species[0].id;  // Convert the data in string  
    // Function to get the data with API of GBIF
    //  async function gbifAPI(id){
    //   const gbif = await fetch("https://api.gbif.org/v1/species/id/distributions");
    //   const data = await gbif.json();
    //   return data;
    //   };
    // const distributionData = await gbifAPI(speciesId);

    // Mistral 
    const question = "Dis moi en plus sur l'espèce" + commonNames.join(", ") + "?";
    const mistralres = await mistralAPI(api_key_mistral,question);

    // Send response

    res.end(JSON.stringify({
      message: mistralres,
      species: species,
      commonNames: commonNames
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
