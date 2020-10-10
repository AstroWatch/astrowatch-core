import swisseph from 'swisseph';
import { LORD, RASHIS, AYANAMSHA_LAHIRI, PLANET_BODY_NUMBER, HOUSE_TYPE_ASCENDANT } from './constants';
;
export default class Horoscope {
    constructor(inputParams) {
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
        swisseph.swe_set_sid_mode(AYANAMSHA_LAHIRI, 0, 0);
    }
    getAllHouses() {
        const lords = Object.keys(LORD);
        lords.map((lord) => {
            const { rashi } = this.getRashiOfLord(lord);
            this.house[0] = {
                rashi,
                lords: [LORD.ASCENDANT]
            };
        });
        return;
    }
    getHouse(index) {
        if (index < 1 || index > 12) {
            throw new Error('House number can only be between 1 and 12');
        }
        return this.house[index - 1];
    }
    generateHousesFromAscendant() {
        const houses = [];
        const ascendantRashi = this.getRashiOfLord(LORD.ASCENDANT).rashi;
        const offset = RASHIS.indexOf(ascendantRashi);
        for (let i = 0; i < 12; i++) {
            const rashiIndex = (i + offset) % 12;
            houses[i] = {
                rashi: RASHIS[rashiIndex],
                lords: []
            };
        }
        const lords = Object.keys(LORD);
        lords.forEach((lord) => {
            const { rashi } = this.getRashiOfLord(lord);
            const lordsCurrentHouse = houses.find(((house) => house.rashi === rashi));
            lordsCurrentHouse.lords.push(lord);
        });
        return houses;
    }
    getRashiOfLord(lord) {
        const flags = swisseph.SEFLG_SIDEREAL;
        if (lord === LORD.KETU) {
            return this.getKetuPosition();
        }
        else if (lord === LORD.ASCENDANT) {
            return this.getAscendantPosition();
        }
        const lordPosition = swisseph.swe_calc_ut(this.findJulianDay().inET, PLANET_BODY_NUMBER[lord], flags);
        return {
            ...lordPosition,
            rashi: this.getRashiFromLongitude(lordPosition.longitude),
        };
    }
    getAscendantPosition() {
        const { ascendant } = swisseph.swe_houses_ex(this.findJulianDay().inUT, swisseph.SEFLG_SIDEREAL, this.latitude, this.longitude, HOUSE_TYPE_ASCENDANT);
        return {
            longitude: ascendant,
            rashi: this.getRashiFromLongitude(ascendant)
        };
    }
    getKetuPosition() {
        const rahuPosition = swisseph.swe_calc_ut(this.findJulianDay().inET, PLANET_BODY_NUMBER[LORD.RAHU], swisseph.SEFLG_SIDEREAL);
        const rahuLongitude = rahuPosition.longitude;
        const ketuLongitude = rahuLongitude >= 180
            ? rahuLongitude - 180
            : rahuLongitude + 180;
        return {
            ...rahuPosition,
            longitude: ketuLongitude,
            rashi: this.getRashiFromLongitude(ketuLongitude),
        };
    }
    getRashiFromLongitude(longitude) {
        const ONE_HOUSE_DEGREE = 30;
        const houseIndex = Math.floor(longitude / ONE_HOUSE_DEGREE);
        if (houseIndex < 0 || houseIndex > 11) {
            console.warn('Check getRashiFromLongitude. Longitude', longitude);
        }
        return RASHIS[houseIndex];
    }
    findJulianDay() {
        const utc = swisseph.swe_utc_time_zone(this.year, this.month, this.day, this.hour, this.minute, this.second, this.timezoneOffset);
        const { julianDayET, julianDayUT } = swisseph.swe_utc_to_jd(utc.year, utc.month, utc.day, utc.hour, utc.minute, utc.second, swisseph.SE_GREG_CAL);
        return {
            inET: julianDayET,
            inUT: julianDayUT
        };
    }
}
