// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PlantNetAPI } from './PlantNetAPI.js';
import { mistralAPI } from './MistralAPI.js';
import { config } from 'dotenv';
config();

// Initialize Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());

// Route for GET request to retrieve data
app.get('/data', async (req, res) => {
    try {
        // Retrieve API keys from environment variables
        const api_key_plantnet = process.env.API_KEY_PLANTNET;
        const api_key_mistral = process.env.API_KEY_MISTRAL;

        // Call PlantNet API to get plant species data
        const data = await PlantNetAPI('species', api_key_plantnet);
        const species = data[0];

        // Call Mistral API to get Mistral response
        const question = "Quelle est la taille de la tour effeil?";
        const mistralres = await mistralAPI(api_key_mistral, question);

        // Send the retrieved data as response
        res.json({
            message: mistralres,
            species: species
        });
    } catch (error) {
        // Handle errors and send appropriate response
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
