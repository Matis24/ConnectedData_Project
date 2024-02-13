async function PlantNetAPI(api_key){
    const plantnet = await fetch(`https://my-api.plantnet.org/v2/species?api-key=${api_key}&lang=en`);
    const data = await plantnet.json();
    return data;
  };

module.exports = PlantNetAPI;
