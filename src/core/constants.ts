export type LordType = 'ASCENDANT' | 'SUN' | 'MOON' | 'MERCURY'
    | 'VENUS' | 'MARS' | 'JUPITER' | 'SATURN' | 'RAHU' | 'KETU';
export type RashiType = 'ARIES' | 'TAURUS' |'GEMINI'
    | 'CANCER' | 'LEO' | 'VIRGO' |
    'LIBRA' | 'SCORPIO' | 'SAGITTARIUS' |
    'CAPRICORN' | 'AQUARIUS' | 'PISCES';
export type HouseNumberType = 1 | 2 | 3 | 4 | 5 | 6
    | 7 | 8 | 9 | 10 | 11 | 12;


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

export const EXALTED_LORD = {
    [LORD.SUN]: RASHI.ARIES,
    [LORD.MOON]: RASHI.TAURUS,
    [LORD.RAHU]: RASHI.TAURUS,
    [LORD.JUPITER]: RASHI.CANCER,
    [LORD.MERCURY]: RASHI.VIRGO,
    [LORD.SATURN]: RASHI.LIBRA,
    [LORD.KETU]: RASHI.SCORPIO,
    [LORD.MARS]: RASHI.CAPRICORN,
    [LORD.VENUS]: RASHI.PISCES
} as {
    [key in LordType]: RashiType
};

export const DEBILITATED_LORD = {
    [LORD.SUN]: RASHI.LIBRA,
    [LORD.MOON]: RASHI.SCORPIO,
    [LORD.RAHU]: RASHI.SCORPIO,
    [LORD.JUPITER]: RASHI.CAPRICORN,
    [LORD.MERCURY]: RASHI.PISCES,
    [LORD.SATURN]: RASHI.ARIES,
    [LORD.KETU]: RASHI.TAURUS,
    [LORD.MARS]: RASHI.CANCER,
    [LORD.VENUS]: RASHI.VIRGO
} as {
    [key in LordType]: RashiType
};

export const RASHI_OWN_LORD = {
    [RASHI.ARIES]: LORD.MARS,
    [RASHI.TAURUS]: LORD.VENUS,
    [RASHI.GEMINI]: LORD.MERCURY,

    [RASHI.CANCER]: LORD.MOON,
    [RASHI.LEO]: LORD.SUN,
    [RASHI.VIRGO]: LORD.MERCURY,

    [RASHI.LIBRA]: LORD.VENUS,
    [RASHI.SCORPIO]: LORD.MARS,
    [RASHI.SAGITTARIUS]: LORD.JUPITER,

    [RASHI.CAPRICORN]: LORD.SATURN,
    [RASHI.AQUARIUS]: LORD.SATURN,
    [RASHI.PISCES]: LORD.JUPITER
} as {
    [key in RashiType]: LordType
};

export const LORD_FULL_ASPECT = {
    // Every lord aspects 7th house from itself
    [LORD.SUN]: [7],
    [LORD.MOON]: [7],
    [LORD.RAHU]: [7],
    [LORD.MERCURY]: [7],
    [LORD.KETU]: [7],
    [LORD.VENUS]: [7],

    // Special aspects
    [LORD.SATURN]: [3, 7, 10],
    [LORD.JUPITER]: [5, 7, 9],
    [LORD.MARS]: [4, 7, 8]
} as {
    [key in LordType]: HouseNumberType[]
};
