//Get the data from GBIF depending on the path
export const gbifAPI = async (gbifId = {}) => {
  try{
    const response = await fetch(`https://api.gbif.org/v1/occurrence/${gbifId}/verbatim`);

    const species_loc = await response.json(); // Data to json

    return species_loc;
  }
  catch (error) {
    throw new Error('GBIF API request failed', error);
  }
};
