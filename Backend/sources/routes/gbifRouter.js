import { Router } from 'express';
import { gbifAPI } from '../services/gbifAPI.js';

const locationRoute = Router();

// Information for the swagger
/**
 * @swagger
 * /species/{speciesId}/location:
 *   get:
 *     summary: Get the location of a plant species from the GBIF API
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: speciesId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the plant species to retrieve location for
 *     responses:
 *       200:
 *         description: The location of the specified plant species from the GBIF API
 *       404:
 *         description: Species not found
 *       500:
 *         description: Internal server error
 */

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