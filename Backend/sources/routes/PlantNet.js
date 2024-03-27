import { Router } from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';

const router = Router();

//Create a router for each species 
router.get('/', async (req, res) => {
  const species = await getPlantNetSpecies();
  res.json(species);
});

//Create a router to get the common names
router.get('/:commonNames', async (req, res) => {
    const species = await getPlantNetSpecies();
    const commonNames = species.find(({ commonNames }) => commonNames === req.params.commonNames);

  res.json(commonNames); 
});

export default router;