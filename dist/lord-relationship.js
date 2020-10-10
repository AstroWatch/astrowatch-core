import { RASHI_OWN_LORD, PLANET_PERMANENT_RELATIONSHIP, HOUSE_DIRECTION_STRENGTH, LORD, ASC_FUNCTIONAL_BENEFIC_LORDS, ASC_FUNCTIONAL_NEUTRAL_LORDS, ASC_FUNCTIONAL_MALEFIC_LORDS } from './constants';
export default class LordRelationship {
    constructor(horoscope) {
        this.horoscope = horoscope;
    }
    findNetRelationScore(baseLord, lordForComparison) {
        let score = 0;
        const temporary = this.findTemporaryRelation();
        if (PLANET_PERMANENT_RELATIONSHIP[baseLord].friend.has(lordForComparison)) {
            score++;
        }
        else if (PLANET_PERMANENT_RELATIONSHIP[baseLord].enemy.has(lordForComparison)) {
            score--;
        }
        if (temporary[baseLord].friend.has(lordForComparison)) {
            score++;
        }
        else if (temporary[baseLord].enemy.has(lordForComparison)) {
            score--;
        }
        return score;
    }
    findDirectionalStrength() {
        const result = {
            strong: [],
            weak: []
        };
        Object.keys(HOUSE_DIRECTION_STRENGTH)
            .forEach((houseNumber) => {
            const { lords } = this.horoscope.getHouse(houseNumber);
            const { strong, weak } = HOUSE_DIRECTION_STRENGTH[houseNumber];
            lords.forEach((lord) => {
                if (strong.includes(lord)) {
                    result.strong.push(lord);
                }
                else if (weak.includes(lord)) {
                    result.weak.push(lord);
                }
            });
        });
        return result;
    }
    findFunctionalRelation() {
        const ascendantRashi = this.horoscope.getRashiOfLord(LORD.ASCENDANT).rashi;
        return {
            benefic: ASC_FUNCTIONAL_BENEFIC_LORDS[ascendantRashi],
            neutral: ASC_FUNCTIONAL_NEUTRAL_LORDS[ascendantRashi],
            malefic: ASC_FUNCTIONAL_MALEFIC_LORDS[ascendantRashi]
        };
    }
    findTemporaryRelation() {
        const result = {};
        for (let i = 1; i <= 12; i++) {
            const { lords } = this.horoscope.getHouse(i);
            lords.forEach((lord) => {
                if (lord === LORD.ASCENDANT) {
                    return;
                }
                const friend = this.findTemporaryFriends(i);
                const enemy = this.findTemporaryEnemies(i, lord);
                result[lord] = {
                    friend,
                    enemy
                };
            });
        }
        return result;
    }
    findTemporaryFriends(houseNumber) {
        let friends = new Set();
        for (let offset = 1; offset <= 3; offset++) {
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
    findTemporaryEnemies(houseNumber, lord) {
        const friends = this.findTemporaryFriends(houseNumber);
        const enemiesArr = Object.keys(LORD)
            .filter((item) => !friends.has(item));
        const enemies = new Set(enemiesArr);
        enemies.delete(lord);
        enemies.delete(LORD.ASCENDANT);
        return enemies;
    }
    findLordsInEnemyHouse() {
        return this.findLordsRelationWithHouse('enemy');
    }
    findLordsInNeutralHouse() {
        return this.findLordsRelationWithHouse('neutral');
    }
    findLordsInFriendsHouse() {
        return this.findLordsRelationWithHouse('friend');
    }
    findLordsRelationWithHouse(key) {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            const { rashi, lords } = this.horoscope.getHouse(i);
            const rashiLord = RASHI_OWN_LORD[rashi];
            lords.forEach((lord) => {
                const relation = PLANET_PERMANENT_RELATIONSHIP[lord];
                const keyPlanets = relation?.[key];
                if (keyPlanets && keyPlanets.has(rashiLord)) {
                    result.push({
                        lord,
                        houseNumber: i
                    });
                }
            });
        }
        return result;
    }
}
