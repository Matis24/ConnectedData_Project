import { gbifAPI } from '../services/gbifAPI.js';

describe('gbifAPI', () => {
    it('should return information about localisation of the species', async () => {
        
        // Get the species from the API of PlantNet
        const response = await gbifAPI(10868985);
            
        console.log(response);
    }, 15000);
});
