import Aspect from '../aspect';
import Horoscope from '../horoscope';
import {LORD} from '../constants';

const TEST_INPUT = {
    year: 2017,
    month: 9,
    day: 6,
    hour: 7,
    minute: 17,
    second: 0,
    timezoneOffset: -7,
    latitude: 37.354107,
    longitude: -121.955238
};

describe('Aspect', () => {
    describe('findExaltatedLords', () => {
        it('should return exaltated lords', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const aspect = new Aspect(horoscope);

            const exaltedLords = aspect.findExaltatedLords()
            expect(exaltedLords).toEqual([]);
        });
    });

    describe('findDebilitatedLords', () => {
        it('should return debilitated lords', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const aspect = new Aspect(horoscope);

            const debilitatedLords = aspect.findDebilitatedLords()
            expect(debilitatedLords).toEqual([]);
        });
    });

    describe('findLordsInOwnHouse', () => {
        it('should return lords in own house', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const aspect = new Aspect(horoscope);

            const ownerLords = aspect.findLordsInOwnHouse()
            expect(ownerLords).toEqual([LORD.SUN]);
        });
    });
});
