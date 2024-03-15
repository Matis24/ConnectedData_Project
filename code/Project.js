// Library needed
const http = require('http');
require('dotenv').config();

//APIs Keys 
const api_key_plantnet = process.env.API_KEY_PLANTNET;
const api_key_mistral = process.env.API_KEY_MISTRAL;

//APIs Functions
const test = require('./PlantNetAPI');

// Launch the server
const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  try{
    //Call the function to get the data from PlantNet
    const data = await test(api_key_plantnet);
    const species = data[0];

    // const speciesId = species[0].id;  // Convert the data in string  
    // Function to get the data with API of GBIF
    //  async function gbifAPI(id){
    //   const gbif = await fetch("https://api.gbif.org/v1/species/id/distributions");
    //   const data = await gbif.json();
    //   return data;
    //   };
    // const distributionData = await gbifAPI(speciesId);

    // Mistral 
    // Fonction
    async function mistralAPI(){
      const mistral = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${api_key_mistral}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "mistralai/mistral-7b-instruct:free", // Optional (user controls the default),
          "messages": [
            {"role": "user", "content": "What is the meaning of life?"},
          ]
        })
      });
      return mistral
    }

    const mistralres = await mistralAPI();

    // Send response

    res.end(JSON.stringify({
      message: mistralres,
      species: species
    }));
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
