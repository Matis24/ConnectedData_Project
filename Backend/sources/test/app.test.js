import express from 'express';
import { getPlantNetSpecies } from '../services/PlantNetAPI.js';

const app = express();

app.get('/test', (req,res) => {
    res.send('Hello World');
});

app.get('/', async (req,res) => {
    const species = await getPlantNetSpecies();
    res.json(species);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});