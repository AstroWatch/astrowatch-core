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
});
