import { getPlantNetSpecies } from '../services/PlantNetAPI.js';

describe('PlantNetAPI', () => {
    it('should return information about species', async () => {
        
        // Get the species from the API of PlantNet
        const response = await getPlantNetSpecies();
            
        console.log(response);
    }, 15000);
});
