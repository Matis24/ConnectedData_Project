import { Router } from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';

const speciesRoute = Router();

// Information for the swagger 
/**
 * @swagger
 * /species:
 *   get:
 *     description: Returns all plant species
 *     responses:
 *       200:
 *         description: A list of plant species
 */

//Create a router for all species 
speciesRoute.get('/', async (req, res) => {
  try{
    const species = await getPlantNetSpecies();
    res.json(species);
  } catch (error) {
    console.error("Error in the PlantNet API", error);
  }
});


// Information for the swagger
/**
 * @swagger
 * /species/{speciesId}:
 *   get:
 *     description: Returns a specific plant species by ID
 *     parameters:
 *       - in: path
 *         name: speciesId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the plant species to retrieve
 *     responses:
 *       200:
 *         description: The plant species with the specified ID
 *       404:
 *         description: Species not found
 */

//Create a router to get one species with the id
speciesRoute.get('/:speciesId', async (req, res) => {
  try {
    const speciesId = req.params.speciesId;
    const species = await getPlantNetSpecies();
    const selectedSpecies = species.find(species => species.gbifId.toString() === speciesId);

    if (selectedSpecies) {
      res.json(selectedSpecies);
    } else {
      res.status(404).json({ error: "Species not found" });
    }
  } catch (error) {
    console.error("Error in the PlantNet API or with the species Id", error);
  } 
});


export default speciesRoute;