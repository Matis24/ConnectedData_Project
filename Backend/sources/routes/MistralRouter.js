import { Router } from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';
import { mistralAPI } from '../services/MistralAPI.js';

const mistralRoute = Router();

mistralRoute.get('/:speciesId/mistral', async (req, res) => {
    // We get the id of the selected species
    const speciesId = req.params.speciesId;
    try { 
        //Get the information about this species from the API of PlantNet
        const species = await getPlantNetSpecies();
        const selectedSpecies = species.find(species => species.gbifId.toString() === speciesId);

        //If the species is found, we ask a question to the Mistral API with the name of the species
        if (selectedSpecies) {
            const commonNames = selectedSpecies.commonNames
            const question = "Dis moi en plus sur l'espèce" + commonNames.join(", ") + "?";
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