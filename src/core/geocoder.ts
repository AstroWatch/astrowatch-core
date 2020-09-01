import fetch from 'node-fetch';

const API_OPEN_STREET_MAP = 'https://nominatim.openstreetmap.org/search';

interface Location {
    country: string;
    state: string;
    city: string;
}

interface GeoCode {
    lat: string;
    lon: string;
    placeName: string;
}

interface APIResponse {
    lat: string;
    lon: string;
    display_name: string;
    importance: number;
    place_id: number;
}

/**
 * Query OpenStreetMap API for Lat/Long for a location
 *
 * @param {string} country Country
 * @param {string} state State
 * @param {string} city City
 * @returns {GeoCode} Place Name and Lat/Long
 */
export default async function geocoder(location: Location): Promise<GeoCode | null> {
    const {country, state, city} = location;
    if (!country || !state || !city) {
        throw new Error(`Please provide the country, state and city ${JSON.stringify(location)}`);
    }

    const params = new URLSearchParams();
    params.append('format', 'json');
    params.append('limit', '1');
    params.append('country', country);
    params.append('state', state);
    params.append('city', city);

    const url = `${API_OPEN_STREET_MAP}?${params.toString()}`;

    let geocode = null;

    try {
        const response = await fetch(url);
        const result: APIResponse[] = await response.json();

        const firstResult = result?.[0];

        if (firstResult) {
            geocode = {
                lat: firstResult.lat,
                lon: firstResult.lon,
                placeName: firstResult.display_name
            };
        } else {
            console.error('No results found for', location);
        }
    } catch(err) {
        console.error(err);

        throw err;
    }

    return geocode;
}
