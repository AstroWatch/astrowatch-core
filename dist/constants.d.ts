export declare type LordType = 'ASCENDANT' | 'SUN' | 'MOON' | 'MERCURY' | 'VENUS' | 'MARS' | 'JUPITER' | 'SATURN' | 'RAHU' | 'KETU';
export declare type RashiType = 'ARIES' | 'TAURUS' | 'GEMINI' | 'CANCER' | 'LEO' | 'VIRGO' | 'LIBRA' | 'SCORPIO' | 'SAGITTARIUS' | 'CAPRICORN' | 'AQUARIUS' | 'PISCES';
export declare type HouseNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export declare type SquareHouseType = 1 | 4 | 7 | 10;
declare type FunctionalRelation = {
    [key in RashiType]: Set<LordType>;
};
export declare const LORD: {
    readonly ASCENDANT: "ASCENDANT";
    readonly SUN: "SUN";
    readonly MOON: "MOON";
    readonly MARS: "MARS";
    readonly MERCURY: "MERCURY";
    readonly VENUS: "VENUS";
    readonly JUPITER: "JUPITER";
    readonly SATURN: "SATURN";
    readonly RAHU: "RAHU";
    readonly KETU: "KETU";
};
export declare const RASHI: {
    readonly ARIES: "ARIES";
    readonly TAURUS: "TAURUS";
    readonly GEMINI: "GEMINI";
    readonly CANCER: "CANCER";
    readonly LEO: "LEO";
    readonly VIRGO: "VIRGO";
    readonly LIBRA: "LIBRA";
    readonly SCORPIO: "SCORPIO";
    readonly SAGITTARIUS: "SAGITTARIUS";
    readonly CAPRICORN: "CAPRICORN";
    readonly AQUARIUS: "AQUARIUS";
    readonly PISCES: "PISCES";
};
export declare const RASHIS: RashiType[];
export declare const AYANAMSHA_LAHIRI = 1;
export declare const HOUSE_TYPE_ASCENDANT = "A";
export declare const PLANET_BODY_NUMBER: {
    readonly SUN: 0;
    readonly MOON: 1;
    readonly MERCURY: 2;
    readonly VENUS: 3;
    readonly MARS: 4;
    readonly JUPITER: 5;
    readonly SATURN: 6;
    readonly URANUS: 7;
    readonly NEPTUNE: 8;
    readonly PLUTO: 9;
    readonly RAHU: 10;
};
export declare const EXALTED_LORD: {
    ASCENDANT: RashiType;
    SUN: RashiType;
    MOON: RashiType;
    MERCURY: RashiType;
    VENUS: RashiType;
    MARS: RashiType;
    JUPITER: RashiType;
    SATURN: RashiType;
    RAHU: RashiType;
    KETU: RashiType;
};
export declare const DEBILITATED_LORD: {
    ASCENDANT: RashiType;
    SUN: RashiType;
    MOON: RashiType;
    MERCURY: RashiType;
    VENUS: RashiType;
    MARS: RashiType;
    JUPITER: RashiType;
    SATURN: RashiType;
    RAHU: RashiType;
    KETU: RashiType;
};
export declare const HOUSE_DIRECTION_STRENGTH: {
    1: {
        strong: LordType[];
        weak: LordType[];
    };
    10: {
        strong: LordType[];
        weak: LordType[];
    };
    7: {
        strong: LordType[];
        weak: LordType[];
    };
    4: {
        strong: LordType[];
        weak: LordType[];
    };
};
export declare const RASHI_OWN_LORD: {
    ARIES: LordType;
    TAURUS: LordType;
    GEMINI: LordType;
    CANCER: LordType;
    LEO: LordType;
    VIRGO: LordType;
    LIBRA: LordType;
    SCORPIO: LordType;
    SAGITTARIUS: LordType;
    CAPRICORN: LordType;
    AQUARIUS: LordType;
    PISCES: LordType;
};
export declare const LORD_FULL_ASPECT: {
    ASCENDANT: HouseNumberType[];
    SUN: HouseNumberType[];
    MOON: HouseNumberType[];
    MERCURY: HouseNumberType[];
    VENUS: HouseNumberType[];
    MARS: HouseNumberType[];
    JUPITER: HouseNumberType[];
    SATURN: HouseNumberType[];
    RAHU: HouseNumberType[];
    KETU: HouseNumberType[];
};
export declare const PLANET_PERMANENT_RELATIONSHIP: {
    ASCENDANT: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    SUN: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    MOON: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    MERCURY: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    VENUS: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    MARS: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    JUPITER: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    SATURN: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    RAHU: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
    KETU: {
        friend: Set<LordType>;
        neutral: Set<LordType>;
        enemy: Set<LordType>;
    };
};
export declare const PLANET_TEMPORARY_RELATIONSHIP: {
    friend: Set<HouseNumberType>;
    enemy: Set<HouseNumberType>;
};
export declare const SQUARE_HOUSES: number[];
export declare const TRINE_HOUSES: number[];
export declare const NATURAL_BENEFIC_LORDS: ("VENUS" | "JUPITER")[];
export declare const NATURAL_MALEFIC_LORDS: ("SUN" | "MARS" | "SATURN" | "RAHU" | "KETU")[];
export declare const ASC_FUNCTIONAL_BENEFIC_LORDS: FunctionalRelation;
export declare const ASC_FUNCTIONAL_NEUTRAL_LORDS: FunctionalRelation;
export declare const ASC_FUNCTIONAL_MALEFIC_LORDS: FunctionalRelation;
export {};
