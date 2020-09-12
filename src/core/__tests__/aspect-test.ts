import Aspect from '../aspect';
import Horoscope from '../horoscope';
import {LORD} from '../constants';

const TEST_INPUT_SUN_IN_LEO = {
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

// Has 1 exaltation and 1 debilitation
const TEST_INPUT_LIBRA_ASCENDANT = {
    year: 1985,
    month: 5,
    day: 16,
    hour: 16,
    minute: 50,
    second: 0,
    timezoneOffset: 5.5,
    latitude: 9.9825665,
    longitude: 76.2990313
};

describe('Aspect', () => {
    describe('findExaltatedLords', () => {
        it('should return exaltated lords', () => {
            const horoscope = new Horoscope(TEST_INPUT_LIBRA_ASCENDANT);

            const aspect = new Aspect(horoscope);

            const exaltedLords = aspect.findExaltatedLords()
            expect(exaltedLords).toEqual([LORD.VENUS]);
        });
    });

    describe('findDebilitatedLords', () => {
        it('should return debilitated lords', () => {
            const horoscope = new Horoscope(TEST_INPUT_LIBRA_ASCENDANT);

            const aspect = new Aspect(horoscope);

            const debilitatedLords = aspect.findDebilitatedLords()
            expect(debilitatedLords).toEqual([LORD.JUPITER]);
        });
    });

    describe('findLordsInOwnHouse', () => {
        it('should return lords in own house', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const aspect = new Aspect(horoscope);

            const ownerLords = aspect.findLordsInOwnHouse()
            expect(ownerLords).toEqual([LORD.SUN]);
        });
    });

    describe('findLordAspectOnHouse', () => {
        it('should return aspects for 8th house', () => {
            const horoscope = new Horoscope(TEST_INPUT_LIBRA_ASCENDANT);

            const aspect = new Aspect(horoscope);

            const lordHouseAspect = aspect.findLordAspectOnHouse();
            expect(lordHouseAspect[8]).toEqual([LORD.SATURN, LORD.JUPITER]);
        });

        it('should return aspects for 5th house', () => {
            const horoscope = new Horoscope(TEST_INPUT_LIBRA_ASCENDANT);

            const aspect = new Aspect(horoscope);

            const lordHouseAspect = aspect.findLordAspectOnHouse();
            expect(lordHouseAspect[5]).toEqual([]);
        });

        it('should return aspects for 10th house', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const aspect = new Aspect(horoscope);

            const lordHouseAspect = aspect.findLordAspectOnHouse();
            expect(lordHouseAspect[10]).toEqual([LORD.JUPITER, LORD.SATURN]);
        });
    });
});
