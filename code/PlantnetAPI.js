export async function PlantNetAPI(path, apiKey){
    const response = await fetch(`https://my-api.plantnet.org/v2/${path}?api-key=${apiKey}&lang=en`);
    return response.json();
  };