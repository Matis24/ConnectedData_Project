import { Router } from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';

const speciesRoute = Router();

//Create a router for each species 
speciesRoute.get('/', async (req, res) => {
  try{
    const species = await getPlantNetSpecies();
    res.json(species);
  } catch (error) {
    console.error("Error in the PlantNet API", error);
  }

});

//Create a router to get the common names
// router.get('/species/commonNames/:commonNames', async (req, res) => {
//     const species = await getPlantNetSpecies();
//     const commonNames = species.filter(({ commonNames }) => commonNames === req.params.commonNames);
//     res.json(commonNames); 
// });

export default speciesRoute;