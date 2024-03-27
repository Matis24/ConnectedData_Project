import { PlantNetAPI } from '../services/PlantNetAPI.js';

describe('PlantNetAPI', () => {
    it('should return information about species', async () => {
        // If the function succeeds, it should return an array of species on html
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ species: 'species' }]),
            })
        );
        
        // Get the species from the API of PlantNet
        const response = await PlantNet('species');

        expect(fetch).toHaveBeenCalledWith(`https://my-api.plantnet.org/v2/species?api-key=${process.env.API_KEY_PLANTNET}&lang=en`);
    });

    // If the function fails, it should throw an error :
    it('error', async () => {
        global.fetch = jest.fn(() => Promise.reject('Failed'));

        await expect(PlantNetAPI('species')).rejects.toThrow('PlantNet API request failed');
    });
});
