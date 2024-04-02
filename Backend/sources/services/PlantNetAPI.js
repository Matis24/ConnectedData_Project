  import dotenv from 'dotenv';
  dotenv.config();

  //Get the data from PlantNet depending on the path
  const PlantNetAPI = async (path = {}, limit = {}) => {
    try{
      const response = await fetch(`https://my-api.plantnet.org/v2/${path}?api-key=${process.env.API_KEY_PLANTNET}&lang=en`);

      const species = await response.json(); // Data to json

      const limitedSpecies = species.slice(0, limit); // Slice the array

      return limitedSpecies;
    }
    catch (error) {
      throw new Error('PlantNet API request failed', error);
    }
  };

  //Define the number of species to get
  const limit = 50;

  //Get the species
  export const getPlantNetSpecies = () => {
    return PlantNetAPI('species', limit);
  };