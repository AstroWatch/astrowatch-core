export type LordType = 'ASCENDANT' | 'SUN' | 'MOON' | 'MERCURY'
    | 'VENUS' | 'MARS' | 'JUPITER' | 'SATURN' | 'RAHU' | 'KETU';
export type RashiType = 'ARIES' | 'TAURUS' |'GEMINI'
    | 'CANCER' | 'LEO' | 'VIRGO' |
    'LIBRA' | 'SCORPIO' | 'SAGITTARIUS' |
    'CAPRICORN' | 'AQUARIUS' | 'PISCES';
export type HouseNumberType = 1 | 2 | 3 | 4 | 5 | 6
    | 7 | 8 | 9 | 10 | 11 | 12;
export type SquareHouseType = 1 | 4 | 7 | 10;

type FunctionalRelation = {
    [key in RashiType]: Set<LordType>
};

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
    [LORD.MARS]: RASHI.CAPRICORN,
    [LORD.MERCURY]: RASHI.VIRGO,
    [LORD.JUPITER]: RASHI.CANCER,
    [LORD.VENUS]: RASHI.PISCES,
    [LORD.SATURN]: RASHI.LIBRA,
    [LORD.RAHU]: RASHI.TAURUS,
    [LORD.KETU]: RASHI.SCORPIO
} as {
    [key in LordType]: RashiType
};

export const DEBILITATED_LORD = {
    [LORD.SUN]: RASHI.LIBRA,
    [LORD.MOON]: RASHI.SCORPIO,
    [LORD.MARS]: RASHI.CANCER,
    [LORD.MERCURY]: RASHI.PISCES,
    [LORD.JUPITER]: RASHI.CAPRICORN,
    [LORD.VENUS]: RASHI.VIRGO,
    [LORD.SATURN]: RASHI.ARIES,
    [LORD.RAHU]: RASHI.SCORPIO,
    [LORD.KETU]: RASHI.TAURUS
} as {
    [key in LordType]: RashiType
};

// DIG BALA
export const HOUSE_DIRECTION_STRENGTH = {
    1: {
        strong: [LORD.MERCURY, LORD.JUPITER],
        weak: [LORD.SATURN]
    },
    4: {
        strong: [LORD.MOON, LORD.VENUS],
        weak: [LORD.SUN, LORD.MARS]
    },
    7: {
        strong: [LORD.SATURN],
        weak: [LORD.JUPITER, LORD.MERCURY]
    },
    10: {
        strong: [LORD.SUN, LORD.MARS],
        weak: [LORD.MOON, LORD.VENUS]
    }
} as {
    [key in SquareHouseType]: {
        strong: LordType[],
        weak: LordType[]
    }
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
    [LORD.MERCURY]: [7],
    [LORD.VENUS]: [7],

    // Special aspects
    [LORD.SATURN]: [3, 7, 10],
    [LORD.JUPITER]: [5, 7, 9],
    [LORD.MARS]: [4, 7, 8],
    [LORD.RAHU]: [5, 7, 9],
    [LORD.KETU]: [5, 7, 9]
} as {
    [key in LordType]: HouseNumberType[]
};

export const PLANET_PERMANENT_RELATIONSHIP = {
    [LORD.SUN]: {
        friend: new Set([LORD.MOON, LORD.MARS, LORD.JUPITER]),
        neutral: new Set([LORD.MERCURY]),
        enemy: new Set([LORD.VENUS, LORD.SATURN, LORD.RAHU, LORD.KETU])
    },
    [LORD.MOON]: {
        friend: new Set([LORD.SUN, LORD.MERCURY]),
        neutral: new Set([LORD.MARS, LORD.JUPITER, LORD.VENUS, LORD.SATURN]),
        enemy: new Set([LORD.RAHU, LORD.KETU])
    },
    [LORD.MARS]: {
        friend: new Set([LORD.SUN, LORD.MOON, LORD.JUPITER, LORD.KETU]),
        neutral: new Set([LORD.VENUS, LORD.SATURN]),
        enemy: new Set([LORD.MERCURY, LORD.RAHU])
    },
    [LORD.MERCURY]: {
        friend: new Set([LORD.SUN, LORD.VENUS]),
        neutral: new Set([LORD.MARS, LORD.JUPITER, LORD.SATURN, LORD.RAHU, LORD.KETU]),
        enemy: new Set([LORD.MOON])
    },
    [LORD.JUPITER]: {
        friend: new Set([LORD.SUN, LORD.MOON, LORD.MARS, LORD.RAHU]),
        neutral: new Set([LORD.SATURN, LORD.KETU]),
        enemy: new Set([LORD.MERCURY])
    },
    [LORD.VENUS]: {
        friend: new Set([LORD.MERCURY, LORD.SATURN, LORD.RAHU, LORD.KETU]),
        neutral: new Set([LORD.MARS, LORD.JUPITER]),
        enemy: new Set([LORD.SUN, LORD.MOON])
    },
    [LORD.SATURN]: {
        friend: new Set([LORD.MERCURY, LORD.VENUS, LORD.RAHU]),
        neutral: new Set([LORD.JUPITER]),
        enemy: new Set([LORD.SUN, LORD.MOON, LORD.MARS, LORD.KETU])
    },
    [LORD.RAHU]: {
        friend: new Set([LORD.JUPITER, LORD.VENUS, LORD.SATURN]),
        neutral: new Set([LORD.MERCURY]),
        enemy: new Set([LORD.SUN, LORD.MOON, LORD.MARS, LORD.KETU])
    },
    [LORD.KETU]: {
        friend: new Set([LORD.MARS, LORD.VENUS, LORD.SATURN]),
        neutral: new Set([LORD.MERCURY, LORD.JUPITER]),
        enemy: new Set([LORD.SUN, LORD.MOON, LORD.SATURN, LORD.RAHU])
    }
} as {
    [key in LordType]: {
        friend: Set<LordType>,
        neutral: Set<LordType>,
        enemy: Set<LordType>
    }
};

// Positions from the lord
export const PLANET_TEMPORARY_RELATIONSHIP = {
    friend: new Set<HouseNumberType>([2, 3, 4, 10, 11, 12]),
    enemy: new Set<HouseNumberType>([1, 5, 6, 7, 8, 9])
};

// Kendra sthanas
export const SQUARE_HOUSES = [1, 4, 7, 10];

// Trikona sthanas
export const TRINE_HOUSES = [1, 5, 9];

export const NATURAL_BENEFIC_LORDS = [LORD.VENUS, LORD.JUPITER];
export const NATURAL_MALEFIC_LORDS = [LORD.SUN, LORD.MARS, LORD.SATURN, LORD.RAHU, LORD.KETU];

// Source: Vedic Astrology: An Integrated Approach - PVR Narasimha Rao
export const ASC_FUNCTIONAL_BENEFIC_LORDS = {
    [RASHI.ARIES]: new Set([LORD.SUN, LORD.MARS, LORD.JUPITER]),
    [RASHI.TAURUS]: new Set([LORD.SUN, LORD.MERCURY, LORD.SATURN]),
    [RASHI.GEMINI]: new Set([LORD.VENUS]),
    [RASHI.CANCER]: new Set([LORD.MOON, LORD.MARS, LORD.JUPITER]),
    [RASHI.LEO]: new Set([LORD.SUN, LORD.MARS, LORD.JUPITER]),
    [RASHI.VIRGO]: new Set([LORD.MERCURY, LORD.VENUS]),
    [RASHI.LIBRA]: new Set([LORD.MERCURY, LORD.VENUS, LORD.SATURN]),
    [RASHI.SCORPIO]: new Set([LORD.MOON, LORD.JUPITER]),
    [RASHI.SAGITTARIUS]: new Set([LORD.SUN, LORD.MARS]),
    [RASHI.CAPRICORN]: new Set([LORD.VENUS, LORD.MERCURY, LORD.SATURN]),
    [RASHI.AQUARIUS]: new Set([LORD.VENUS, LORD.SATURN]),
    [RASHI.PISCES]: new Set([LORD.MOON, LORD.MARS])
} as FunctionalRelation;
export const ASC_FUNCTIONAL_NEUTRAL_LORDS = {
    [RASHI.ARIES]: new Set(),
    [RASHI.TAURUS]: new Set([LORD.MARS]),
    [RASHI.GEMINI]: new Set([LORD.MOON, LORD.MERCURY, LORD.SATURN]),
    [RASHI.CANCER]: new Set([LORD.SUN, LORD.SATURN]),
    [RASHI.LEO]: new Set([LORD.MOON]),
    [RASHI.VIRGO]: new Set([LORD.SUN, LORD.SATURN]),
    [RASHI.LIBRA]: new Set([]),
    [RASHI.SCORPIO]: new Set([LORD.SUN, LORD.MARS]),
    [RASHI.SAGITTARIUS]: new Set([LORD.MOON, LORD.MERCURY, LORD.JUPITER]),
    [RASHI.CAPRICORN]: new Set([LORD.SUN]),
    [RASHI.AQUARIUS]: new Set([LORD.SUN, LORD.MERCURY]),
    [RASHI.PISCES]: new Set([LORD.JUPITER])
} as FunctionalRelation;
export const ASC_FUNCTIONAL_MALEFIC_LORDS = {
    [RASHI.ARIES]: new Set([LORD.MERCURY, LORD.VENUS, LORD.SATURN]),
    [RASHI.TAURUS]: new Set([LORD.MOON, LORD.JUPITER, LORD.VENUS]),
    [RASHI.GEMINI]: new Set([LORD.SUN, LORD.MARS, LORD.JUPITER]),
    [RASHI.CANCER]: new Set([LORD.MERCURY, LORD.VENUS]),
    [RASHI.LEO]: new Set([LORD.MERCURY, LORD.VENUS, LORD.SATURN]),
    [RASHI.VIRGO]: new Set([LORD.MOON, LORD.MARS, LORD.JUPITER]),
    [RASHI.LIBRA]: new Set([LORD.SUN, LORD.MARS, LORD.JUPITER]),
    [RASHI.SCORPIO]: new Set([LORD.MERCURY, LORD.VENUS, LORD.SATURN]),
    [RASHI.SAGITTARIUS]: new Set([LORD.VENUS, LORD.SATURN]),
    [RASHI.CAPRICORN]: new Set([LORD.MARS, LORD.JUPITER]),
    [RASHI.AQUARIUS]: new Set([LORD.MOON, LORD.MARS, LORD.JUPITER]),
    [RASHI.PISCES]: new Set([LORD.SUN, LORD.MERCURY, LORD.VENUS, LORD.SATURN])
} as FunctionalRelation;
