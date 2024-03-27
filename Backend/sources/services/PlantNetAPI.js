//Get the data from PlantNet depending on the path
const PlantNetAPI = async (path = {}) => {
  try{
    const response = await fetch(`https://my-api.plantnet.org/v2/${path}?api-key=${process.env.API_KEY_PLANTNET}&lang=en`);
    return response.json();
  }
  catch (error) {
    throw new Error('PlantNet API request failed', error);
  }
};

//Get the species
export const getPlantNetSpecies = () => {
  return PlantNetAPI('species');
};