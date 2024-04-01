import { Router } from 'express';
import { gbifAPI } from '../services/gbifAPI.js';

const locationRoute = Router();

//Create a router for the location of the species 
locationRoute.get('/:speciesId/location', async (req, res) => {
    // We get the id of the selected species
    const speciesId = req.params.speciesId;
    try { 
        //Get the location of this species from the API of GBIF
        const location = await gbifAPI(speciesId);

        //If the species is found, we get the data
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ error: "Species not found" });
        }
    } catch (error) {
        console.error("Error in the GBIF API", error);
    }
});

export default locationRoute;