import swisseph from 'swisseph';

import {
    LORD,
    RASHIS,
    RashiType,
    LordType,
    AYANAMSHA_LAHIRI,
    PLANET_BODY_NUMBER,
    HOUSE_TYPE_ASCENDANT
} from './constants';

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
    rashi: RashiType,
    lords: LordType[]
};

export default class Horoscope {
    /* Eg: 2020 */
    year: number;

    /* Eg: 12 */
    month: number;

    /* Eg: 30 */
    day: number;

    /* Eg: 20 */
    hour: number;

    /* Eg: 0 */
    minute: number;

    /* Eg: 0 */
    second: number;

    /* Eg: 5.5 */
    timezoneOffset: number;

    latitude: number;
    longitude: number;

    house: House[];

    ascendantRashi: RashiType;

    constructor(inputParams: HoroscopeInput) {
        this.year = inputParams.year,
        this.month = inputParams.month,
        this.day = inputParams.day,
        this.hour = inputParams.hour,
        this.minute = inputParams.minute,
        this.second = inputParams.second,
        this.timezoneOffset = inputParams.timezoneOffset;
        this.latitude = inputParams.latitude;
        this.longitude = inputParams.longitude;

        this.house = this.generateHousesFromAscendant();

        // The last 2 parameters are ignored
        swisseph.swe_set_sid_mode(AYANAMSHA_LAHIRI, 0, 0);
    }

    getAllHouses(): House[] {
        const lords = Object.keys(LORD) as LordType[];

        lords.map((lord) => {
            const { rashi } = this.getRashiOfLord(lord);

            this.house[0] = {
                rashi,
                lords: [LORD.ASCENDANT]
            };
        });

        return
    }

    getHouse(index: number): House {
        if(index < 1 || index > 12) {
            throw new Error('House number can only be between 1 and 12');
        }

        return this.house[index - 1];
    }

    generateHousesFromAscendant(): House[] {
        const houses: House[] = [];

        const ascendantRashi = this.getRashiOfLord(LORD.ASCENDANT).rashi;

        // Offset of house 1 rashi from Aries
        const offset = RASHIS.indexOf(ascendantRashi);

        for (let i = 0; i < 12; i++) {
            const rashiIndex = (i + offset) % 12;
            houses[i] = {
                rashi: RASHIS[rashiIndex],
                lords: []
            }
        }

        const lords = Object.keys(LORD) as LordType[];

        lords.forEach((lord) => {
            const { rashi } = this.getRashiOfLord(lord);
            const lordsCurrentHouse = houses.find(((house) => house.rashi === rashi ));
            lordsCurrentHouse.lords.push(lord);
        });

        return houses;
    }

    getRashiOfLord(lord: LordType): PlanetPosition | AscendantPosition {
        const flags = swisseph.SEFLG_SIDEREAL;

        if (lord === LORD.KETU) {
            return this.getKetuPosition();
        } else if (lord === LORD.ASCENDANT) {
            return this.getAscendantPosition();
        }

        const lordPosition = swisseph.swe_calc_ut(
            // Julian Day number
            this.findJulianDay().inET,

            // Planet Body Number
            PLANET_BODY_NUMBER[lord as Exclude<LordType, 'KETU' | 'ASCENDANT'>],

            // Flags
            flags
        );

        // Compute position of planets
        return {
            ...lordPosition,
            rashi: this.getRashiFromLongitude(lordPosition.longitude),
        };
    }

    getAscendantPosition(): AscendantPosition {
        const { ascendant } = swisseph.swe_houses_ex(
            this.findJulianDay().inUT,

            //flags
            swisseph.SEFLG_SIDEREAL,

            this.latitude,
            this.longitude,

            HOUSE_TYPE_ASCENDANT
        );

        return {
            longitude: ascendant,
            rashi: this.getRashiFromLongitude(ascendant)
        };
    }

    getKetuPosition(): PlanetPosition {
        const rahuPosition = swisseph.swe_calc_ut(
            // Julian Day number
            this.findJulianDay().inET,

            // Planet Body Number
            PLANET_BODY_NUMBER[LORD.RAHU],

            // Flags
            swisseph.SEFLG_SIDEREAL,
        ) as PlanetPosition;

        const rahuLongitude = rahuPosition.longitude;

        // Ketu will be 180 degrees opposite to Rahu
        const ketuLongitude = rahuLongitude >= 180
            ? rahuLongitude - 180
            : rahuLongitude + 180;

        return {
            ...rahuPosition,
            longitude: ketuLongitude,
            rashi: this.getRashiFromLongitude(ketuLongitude),
        };
    }

    // Each house is 30 degrees each. Once we have the longitude (0 to 360 degrees)
    // we can calculate the house it falls into
    getRashiFromLongitude(longitude: number): RashiType {
        const ONE_HOUSE_DEGREE = 30;

        // Get 0 based index of Rashi
        const houseIndex = Math.floor(longitude / ONE_HOUSE_DEGREE);

        if (houseIndex < 0 || houseIndex > 11) {
            console.warn('Check getRashiFromLongitude. Longitude', longitude);
        }

        return RASHIS[houseIndex];
    }

    findJulianDay(): JulianDay {
        // Convert local time to UTC
        const utc = swisseph.swe_utc_time_zone(
            this.year,
            this.month,
            this.day,
            this.hour,
            this.minute,
            this.second,
            this.timezoneOffset
        );

        // Convert UTC to Julian day in ephemeris time
        const { julianDayET, julianDayUT } = swisseph.swe_utc_to_jd(
            utc.year,
            utc.month,
            utc.day,
            utc.hour,
            utc.minute,
            utc.second,
            swisseph.SE_GREG_CAL
        );

        return {
            inET: julianDayET,
            inUT: julianDayUT
        };
    }
}
