import { RashiType, LordType } from './constants';
interface PlanetPosition {
    longitude: number;
    latitude: number;
    distance: number;
    longitudeSpeed: number;
    latitudeSpeed: number;
    distanceSpeed: number;
    rflag: number;
    rashi: RashiType;
}
interface AscendantPosition {
    rashi: RashiType;
    longitude: number;
}
interface JulianDay {
    inET: number;
    inUT: number;
}
interface HoroscopeInput {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    timezoneOffset: number;
    latitude: number;
    longitude: number;
}
interface House {
    rashi: RashiType;
    lords: LordType[];
}
export default class Horoscope {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    timezoneOffset: number;
    latitude: number;
    longitude: number;
    house: House[];
    constructor(inputParams: HoroscopeInput);
    getAllHouses(): House[];
    getHouse(index: number): House;
    generateHousesFromAscendant(): House[];
    getRashiOfLord(lord: LordType): PlanetPosition | AscendantPosition;
    getAscendantPosition(): AscendantPosition;
    getKetuPosition(): PlanetPosition;
    getRashiFromLongitude(longitude: number): RashiType;
    findJulianDay(): JulianDay;
}
export {};
