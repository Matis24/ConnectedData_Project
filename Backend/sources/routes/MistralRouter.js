import { Router } from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';
import { mistralAPI } from '../services/MistralAPI.js';

const mistralRoute = Router();

// Information for the swagger
/**
 * @swagger
 * /species/{speciesId}/mistral:
 *   get:
 *     summary: Get information about a plant species from the Mistral API
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: speciesId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the plant species to retrieve information for
 *     responses:
 *       200:
 *         description: Information about the specified plant species from the Mistral API
 *       404:
 *         description: Species not found
 *       500:
 *         description: Internal server error
 */

mistralRoute.get('/:speciesId/mistral', async (req, res) => {
    // We get the id of the selected species
    const speciesId = req.params.speciesId;
    try { 
        //Get the information about this species from the API of PlantNet
        const species = await getPlantNetSpecies();
        const selectedSpecies = species.find(species => species.gbifId.toString() === speciesId);

        //If the species is found, we ask a question to the Mistral API with the name of the species
        if (selectedSpecies) {
            const scientificNameWithoutAuthor = selectedSpecies.scientificNameWithoutAuthor
            const question = `Tell me more about this species : ${scientificNameWithoutAuthor} in less than 100 words.`;
            const response = await mistralAPI(question);
            res.json(response);
        } else {
            res.status(404).json({ error: "Species not found" });
        }
    } catch (error) {
        console.error("Error in the mistral API", error);
    }
});

export default mistralRoute;