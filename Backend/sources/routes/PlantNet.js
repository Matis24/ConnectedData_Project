import { Router } from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';

const speciesRoute = Router();

//Create a router for all species 
speciesRoute.get('/', async (req, res) => {
  try{
    const species = await getPlantNetSpecies();
    res.json(species);
  } catch (error) {
    console.error("Error in the PlantNet API", error);
  }
});

//Create a router to get one species with the id
speciesRoute.get('/:speciesId', async (req, res) => {
  try {
    const speciesId = req.params.speciesId;
    const species = await getPlantNetSpecies();
    const selectedSpecies = species.find(species => species.id === speciesId);

    if (selectedSpecies) {
      res.json(selectedSpecies);
    } else {
      res.status(404).json({ error: "Species not found" });
    }
  } catch (error) {
    console.error("Error in the speciesId PlantNet API", error);
  } 
});


export default speciesRoute;