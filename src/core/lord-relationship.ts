import Horoscope from './horoscope';
import {
    RASHI_OWN_LORD,
    PLANET_PERMANENT_RELATIONSHIP,
    HOUSE_DIRECTION_STRENGTH,
    LordType,
    HouseNumberType,
    SquareHouseType,
    LORD,
    ASC_FUNCTIONAL_BENEFIC_LORDS,
    ASC_FUNCTIONAL_NEUTRAL_LORDS,
    ASC_FUNCTIONAL_MALEFIC_LORDS
} from './constants';

interface FunctionalRelation {
    benefic: Set<LordType>;
    neutral: Set<LordType>;
    malefic: Set<LordType>;
}

type TemporaryRelationship = {
    [key in LordType]?: {
        friend: Set<LordType>;
        enemy: Set<LordType>;
    };
};

type RelationshipScore = -2 | -1 | 0 | 1 | 2;

interface LordHouse {
    lord: LordType,
    houseNumber: HouseNumberType
}

interface DirectionalStrength {
    strong: LordType[],
    weak: LordType[]
}

type KeyType = 'friend' | 'enemy' | 'neutral';

/**
 * Returns lords in enemy, friend and neutral houses
 */
export default class LordRelationship {
    horoscope: Horoscope;

    constructor(horoscope: Horoscope) {
        this.horoscope = horoscope;
    }

    /**
     * Returns a score from -2 to +2 indicating planetary friendship
     *
     * @param {LordType} baseLord Set the base for calculating relationship
     * @param {LordType} lordForComparison Compare the relationship of the base lord with this lord
     * @returns
     * -2 for "extreme enemity"
     * -1 for "enemity"
     *  0 for "neutral relationship"
     *  1 for "friendship"
     *  2 for "extreme friendship"
     */
    findNetRelationScore(baseLord: LordType, lordForComparison: LordType): RelationshipScore {
        let score = 0;
        const temporary = this.findTemporaryRelation();

        // Find score based on permanent relation
        if (PLANET_PERMANENT_RELATIONSHIP[baseLord].friend.has(lordForComparison)) {
            score++;
        } else if (PLANET_PERMANENT_RELATIONSHIP[baseLord].enemy.has(lordForComparison)) {
            score--;
        }

        // Find score based on temporary relation
        if (temporary[baseLord].friend.has(lordForComparison)) {
            score++;
        } else if (temporary[baseLord].enemy.has(lordForComparison)) {
            score--;
        }

        return score as RelationshipScore;
    }

    findDirectionalStrength(): DirectionalStrength {
        const result = {
            strong: [] as LordType[],
            weak: [] as LordType[]
        };

        Object.keys(HOUSE_DIRECTION_STRENGTH)
            .forEach((houseNumber) => {
                const { lords } = this.horoscope.getHouse(houseNumber as unknown as SquareHouseType);
                const { strong, weak } = HOUSE_DIRECTION_STRENGTH[houseNumber as unknown as SquareHouseType];

                lords.forEach((lord) => {
                    if (strong.includes(lord)) {
                        result.strong.push(lord);
                    } else if (weak.includes(lord)) {
                        result.weak.push(lord);
                    }
                });
            });

        return result;
    }

    findFunctionalRelation(): FunctionalRelation {
        const ascendantRashi = this.horoscope.getRashiOfLord(LORD.ASCENDANT).rashi;

        return {
            benefic: ASC_FUNCTIONAL_BENEFIC_LORDS[ascendantRashi],
            neutral: ASC_FUNCTIONAL_NEUTRAL_LORDS[ascendantRashi],
            malefic: ASC_FUNCTIONAL_MALEFIC_LORDS[ascendantRashi]
        };
    }

    findTemporaryRelation(): TemporaryRelationship {
        const result: TemporaryRelationship = {};

        for (let i = 1; i <= 12; i++) {
            const { lords } = this.horoscope.getHouse(i);

            lords.forEach((lord) => {
                if (lord === LORD.ASCENDANT) {
                    return;
                }

                const friend = this.findTemporaryFriends(i as HouseNumberType);
                const enemy = this.findTemporaryEnemies(i as HouseNumberType, lord);

                result[lord] = {
                    friend,
                    enemy
                };
            });
        }

        return result;
    }

    /**
     * Method that will calculate lords in +/- 3 houses from itself
     * Friendly lords are those that sits in 2, 3, 4 & 12, 11, 10 from itself
     */
    findTemporaryFriends(houseNumber: HouseNumberType): Set<LordType> {
        let friends = new Set<LordType>();
        for(let offset = 1; offset <= 3 ; offset++) {
            const topNeighbor = (houseNumber + offset) % 12;
            const bottomNeighbor = (houseNumber - offset) < 1
                ? 12 + houseNumber - offset
                : houseNumber - offset;

            const { lords: topLords } = this.horoscope.getHouse(topNeighbor);
            const { lords: bottomLords } = this.horoscope.getHouse(bottomNeighbor);

            friends = new Set([
                ...friends,
                ...topLords,
                ...bottomLords
            ]);
        }

        friends.delete(LORD.ASCENDANT);

        return friends;
    }

    /**
     * Complimentary set of Temporary Friends
     */
    findTemporaryEnemies(houseNumber: HouseNumberType, lord: LordType): Set<LordType> {
        const friends = this.findTemporaryFriends(houseNumber);
        const enemiesArr = Object.keys(LORD)
            .filter((item) => !friends.has(item as LordType)) as LordType[];

        const enemies = new Set<LordType>(enemiesArr);
        enemies.delete(lord);
        enemies.delete(LORD.ASCENDANT);

        return enemies;
    }

    findLordsInEnemyHouse(): LordHouse[] {
        return this.findLordsRelationWithHouse('enemy');
    }

    findLordsInNeutralHouse(): LordHouse[] {
        return this.findLordsRelationWithHouse('neutral');
    }

    findLordsInFriendsHouse(): LordHouse[] {
        return this.findLordsRelationWithHouse('friend');
    }

    findLordsRelationWithHouse(key: KeyType): LordHouse[] {
        const result: LordHouse[] = [];
        for (let i = 1; i <= 12; i++) {
            const { rashi, lords } = this.horoscope.getHouse(i);

            const rashiLord = RASHI_OWN_LORD[rashi];

            lords.forEach((lord) => {
                const relation = PLANET_PERMANENT_RELATIONSHIP[lord];
                const keyPlanets = relation?.[key];
                if (keyPlanets && keyPlanets.has(rashiLord)) {
                    result.push({
                        lord,
                        houseNumber: i as HouseNumberType
                    })
                }
            });
        }

        return result;
    }
}
