import LordRelationship from '../lord-relationship';
import Horoscope from '../horoscope';
import { LORD, LordType } from '../constants';

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

describe('LordRelationship', () => {
    describe('findLordsInEnemyHouse', () => {
        it('should return lords in enemy house', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);

            const lords = relationship.findLordsInEnemyHouse();

            expect(lords).toEqual([
                {
                    houseNumber: 2,
                    lord: LORD.JUPITER
                },
                {
                    houseNumber: 4,
                    lord: LORD.SATURN
                },
                {
                    houseNumber: 6,
                    lord: LORD.KETU
                },
                {
                    houseNumber: 12,
                    lord: LORD.VENUS
                },
                {
                    houseNumber: 12,
                    lord: LORD.RAHU
                }
            ]);
        });
    });

    describe('findLordsInFriendsHouse', () => {
        it('should return lords in friends house', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);

            const lords = relationship.findLordsInFriendsHouse();

            expect(lords).toEqual([
                {
                    houseNumber: 1,
                    lord: LORD.MARS
                },
                {
                    houseNumber: 1,
                    lord: LORD.MERCURY
                },
                {
                    houseNumber: 6,
                    lord: LORD.KETU
                }
            ]);
        });
    });

    describe('findLordsInNeutralHouse', () => {
        it('should return lords in neutral house', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);

            const lords = relationship.findLordsInNeutralHouse();

            expect(lords).toEqual([
                {
                    houseNumber: 7,
                    lord: LORD.MOON
                }
            ]);
        });
    });

    describe('findDirectionalStrength', () => {
        it('should find strong planets based on directional strength', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);

            const { strong } = relationship.findDirectionalStrength();

            expect(strong).toEqual([LORD.MERCURY]);
        });

        it('should find weak planets based on directional strength', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);

            const { weak } = relationship.findDirectionalStrength();

            expect(weak).toEqual([]);
        });
    });

    describe('findFriendlyLords', () => {
        it('should find the lords in top 3 and bottom 3 houses', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const friends = relationship.findTemporaryFriends(1);

            expect(friends).toEqual(new Set([
                LORD.RAHU,
                LORD.VENUS,
                LORD.JUPITER,
                LORD.SATURN
            ]));
        });

        it('should find the lords without including ascendant', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const friends = relationship.findTemporaryFriends(12);

            expect(friends).toEqual(new Set([
                LORD.MERCURY,
                LORD.MARS,
                LORD.SUN,
                LORD.JUPITER
            ]));
        });
    });

    describe('findTemporaryEnemies', () => {
        it('should mark lord in same house as enemies', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const enemies = relationship.findTemporaryEnemies(1, LORD.MARS);

            expect(enemies).toEqual(new Set([
                LORD.MERCURY,
                LORD.SUN,
                LORD.MOON,
                LORD.KETU
            ]));
        });

        it('should find the lords in 1, 5, 6, 7, 8, 9', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const enemies = relationship.findTemporaryEnemies(2, LORD.JUPITER);

            expect(enemies).toEqual(new Set([
                LORD.MOON,
                LORD.KETU
            ]));
        });
    });

    describe('findTemporaryRelation', () => {
        it('should find friends and enemies for Jupiter', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const relation = relationship.findTemporaryRelation();

            expect(relation[LORD.JUPITER]).toEqual({
                friend: new Set<LordType>([
                    LORD.SUN,
                    LORD.MARS,
                    LORD.MERCURY,
                    LORD.SATURN,
                    LORD.VENUS,
                    LORD.RAHU
                ]),
                enemy: new Set<LordType>([
                    LORD.MOON,
                    LORD.KETU
                ])
            });
        });
    });

    describe('findNetRelationScore', () => {
        it('should establish a neutral relation between Venus and Rahu', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const score = relationship.findNetRelationScore(LORD.VENUS, LORD.RAHU);

            // Though VENUS has RAHU as permanent friends,
            // due to temporary enemity they are neutral
            expect(score).toEqual(0);
        });

        it('should establish a neutral relation between Rahu and Venus', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const score = relationship.findNetRelationScore(LORD.RAHU, LORD.VENUS);

            // Though VENUS has RAHU are permanent friends,
            // due to temporary enemity they are neutral
            expect(score).toEqual(0);
        });

        it('should establish Mercury as an extreme enemy for Mars', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const score = relationship.findNetRelationScore(LORD.MARS, LORD.MERCURY);

            // MERCURY is a permanent and temporary enemy for MARS
            expect(score).toEqual(-2);
        });

        it('should establish Mars as an enemy for Mercury', () => {
            const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

            const relationship = new LordRelationship(horoscope);
            const score = relationship.findNetRelationScore(LORD.MERCURY, LORD.MARS);

            // MARS is only a temporary enemy for MERCURY
            expect(score).toEqual(-1);
        });
    });

    describe('findFunctionalRelation', () => {
        const horoscope = new Horoscope(TEST_INPUT_SUN_IN_LEO);

        const relationship = new LordRelationship(horoscope);
        const functionalRelation = relationship.findFunctionalRelation();

        expect(functionalRelation).toEqual({
            benefic: new Set([LORD.SUN, LORD.MARS, LORD.JUPITER]),
            neutral: new Set([LORD.MOON]),
            malefic: new Set([LORD.MERCURY, LORD.VENUS, LORD.SATURN])
        });
    });
});
