import Horoscope from '../horoscope';
import { LORD, RASHI } from '../constants';

const TEST_INPUT = {
    year: 1986,
    month: 7,
    day: 22,
    hour: 20,
    minute: 0,
    second: 0,
    timezoneOffset: 3,
    latitude: 29.3490341,
    longitude: 47.9134571
};

describe('Horoscope', () => {
    describe('calculateLordPosition for 22 July 1986,20:00,29.34/47.91', () => {
        it('should set house 1 as capricorn', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            expect(horoscope.house[0].rashi).toBe(RASHI.CAPRICORN);
        });

        it('should return Moon in Capricorn', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.MOON);

            expect(rashi).toBe(RASHI.CAPRICORN);
        });

        it('should return Jupiter in Aquarius', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.JUPITER);

            expect(rashi).toBe(RASHI.AQUARIUS);
        });

        it('should return Rahu in Aries', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.RAHU);

            expect(rashi).toBe(RASHI.ARIES);
        });

        it('should return Sun in Cancer', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.SUN);

            expect(rashi).toBe(RASHI.CANCER);
        });

        it('should return Mercury in Cancer', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.MERCURY);

            expect(rashi).toBe(RASHI.CANCER);
        });

        it('should return Venus in Leo', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.VENUS);

            expect(rashi).toBe(RASHI.LEO);
        });

        it('should return Ketu in Libra', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.KETU);

            expect(rashi).toBe(RASHI.LIBRA);
        });

        it('should return Saturn in Scorpio', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.SATURN);

            expect(rashi).toBe(RASHI.SCORPIO);
        });

        it('should return Mars in Sagittarius', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.MARS);

            expect(rashi).toBe(RASHI.SAGITTARIUS);
        });

        it('should return Ascendant in Capricorn', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const { rashi } = horoscope.getRashiOfLord(LORD.ASCENDANT);

            expect(rashi).toBe(RASHI.CAPRICORN);
        });
    });

    describe('generateHousesFromAscendant', () => {
        it('should return rashis starting with Capricorn', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const rashis = horoscope.house.map(({rashi}) => rashi);

            expect(rashis).toEqual([
                'CAPRICORN',
                'AQUARIUS',
                'PISCES',
                'ARIES',
                'TAURUS',
                'GEMINI',
                'CANCER',
                'LEO',
                'VIRGO',
                'LIBRA',
                'SCORPIO',
                'SAGITTARIUS'
            ]);
        });

        it('should return positions of the lords', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const lords = horoscope.house.map(({ lords }) => lords);

            expect(lords).toEqual([
                // House 1
                [LORD.ASCENDANT, LORD.MOON],

                [LORD.JUPITER],
                [],
                [LORD.RAHU],
                [],
                [],
                [LORD.SUN, LORD.MERCURY],
                [LORD.VENUS],
                [],
                [LORD.KETU],
                [LORD.SATURN],

                // House 12
                [LORD.MARS]
            ]);
        });
    });

    describe('getHouse', () => {
        it('should return first house rashi and lords', () => {
            const horoscope = new Horoscope(TEST_INPUT);

            const firstHouse = horoscope.getHouse(1);

            expect(firstHouse).toEqual({
                rashi: RASHI.CAPRICORN,
                lords: [LORD.ASCENDANT, LORD.MOON]
            });
        });
    });
});
