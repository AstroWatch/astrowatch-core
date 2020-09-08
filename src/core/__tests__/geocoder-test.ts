import geocoder from '../geocoder';

describe('geocoder', () => {
    it('should return geocode when city is found', async () => {
        const result = await geocoder({
            country: 'India',
            state: 'Kerala',
            city: 'Cochin'
        });

        expect(result[0]).toEqual({
            lat: '9.931308',
            lon: '76.2674136',
            placeName: 'Kochi, Ernakulam district, Kerala, 682005, India',
        });
    });

     it('should return an empty array when city is not found', async () => {
         const result = await geocoder({
             country: 'Kuwait',
             state: 'Kuwait',
             city: 'Salmiah'
         });

         expect(result).toEqual([]);
     });

    it('should throw when city is empty', async () => {
        await expect(
            geocoder({
                city: '',
                country: '',
                state: '',
            })
        ).rejects
        .toThrow(
            'Please provide the country, state and city {"city":"","country":"","state":""}'
        );
    });
});
