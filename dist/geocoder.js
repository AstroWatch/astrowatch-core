import fetch from 'node-fetch';
const API_OPEN_STREET_MAP = 'https://nominatim.openstreetmap.org/search';
export default async function geocoder(location) {
    const { country, state, city } = location;
    if (!country || !state || !city) {
        throw new Error(`Please provide the country, state and city ${JSON.stringify(location)}`);
    }
    const params = new URLSearchParams();
    params.append('format', 'json');
    params.append('limit', '10');
    params.append('country', country);
    params.append('state', state);
    params.append('city', city);
    const url = `${API_OPEN_STREET_MAP}?${params.toString()}`;
    let geocode = [];
    try {
        const response = await fetch(url);
        const result = await response.json();
        geocode = result.map(({ lat, lon, display_name: placeName }) => ({
            lat,
            lon,
            placeName
        }));
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    return geocode;
}
