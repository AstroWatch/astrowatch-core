import Horoscope from './horoscope';
import {
    RASHI_OWN_LORD,
    PLANET_PERMANENT_RELATIONSHIP,
    PLANET_TEMPORARY_RELATIONSHIP,
    HOUSE_DIRECTION_STRENGTH,
    LordType,
    HouseNumberType,
    SquareHouseType, LORD
} from './constants';

type TemporaryRelationship = {
    [key in LordType]?: {
        friend: Set<LordType>;
        enemy: Set<LordType>;
    };
};

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
