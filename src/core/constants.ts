export type LordType = 'ASCENDANT' | 'SUN' | 'MOON' | 'MERCURY'
    | 'VENUS' | 'MARS' | 'JUPITER' | 'SATURN' | 'RAHU' | 'KETU';
export type RashiType = 'ARIES' | 'TAURUS' |'GEMINI'
    | 'CANCER' | 'LEO' | 'VIRGO' |
    'LIBRA' | 'SCORPIO' | 'SAGITTARIUS' |
    'CAPRICORN' | 'AQUARIUS' | 'PISCES';

export const LORD = {
    ASCENDANT: 'ASCENDANT',

    SUN: 'SUN',
    MOON: 'MOON',

    MARS: 'MARS',
    MERCURY: 'MERCURY',
    VENUS: 'VENUS',
    JUPITER: 'JUPITER',
    SATURN: 'SATURN',

    RAHU: 'RAHU',
    KETU: 'KETU'
} as const;

export const RASHI = {
    ARIES: 'ARIES',
    TAURUS: 'TAURUS',
    GEMINI: 'GEMINI',

    CANCER: 'CANCER',
    LEO: 'LEO',
    VIRGO: 'VIRGO',

    LIBRA: 'LIBRA',
    SCORPIO: 'SCORPIO',
    SAGITTARIUS: 'SAGITTARIUS',

    CAPRICORN: 'CAPRICORN',
    AQUARIUS: 'AQUARIUS',
    PISCES: 'PISCES'
} as const;

// Useful to map longitude to Rashi. 0 based index
export const RASHIS = Object.keys(RASHI) as RashiType[];

export const AYANAMSHA_LAHIRI = 1;

// ‘A’ or ‘E’ Equal (cusp 1 is Ascendant)
export const HOUSE_TYPE_ASCENDANT = 'A';

// https://www.astro.com/swisseph/swephprg.htm#_Toc49847882 Section 3.2
export const PLANET_BODY_NUMBER = {
    SUN: 0,
    MOON: 1,
    MERCURY: 2,
    VENUS: 3,
    MARS: 4,
    JUPITER: 5,
    SATURN: 6,

    URANUS: 7,
    NEPTUNE: 8,
    PLUTO: 9,

    // Considering SE_MEAN_NODE for Rahu
    RAHU: 10
} as const;
