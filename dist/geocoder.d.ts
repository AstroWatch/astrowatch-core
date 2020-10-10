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
export default function geocoder(location: Location): Promise<GeoCode[] | null>;
export {};
