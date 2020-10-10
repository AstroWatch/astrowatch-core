import Horoscope from './horoscope';
import { LordType, HouseNumberType } from './constants';
interface FunctionalRelation {
    benefic: Set<LordType>;
    neutral: Set<LordType>;
    malefic: Set<LordType>;
}
declare type TemporaryRelationship = {
    [key in LordType]?: {
        friend: Set<LordType>;
        enemy: Set<LordType>;
    };
};
declare type RelationshipScore = -2 | -1 | 0 | 1 | 2;
interface LordHouse {
    lord: LordType;
    houseNumber: HouseNumberType;
}
interface DirectionalStrength {
    strong: LordType[];
    weak: LordType[];
}
declare type KeyType = 'friend' | 'enemy' | 'neutral';
export default class LordRelationship {
    horoscope: Horoscope;
    constructor(horoscope: Horoscope);
    findNetRelationScore(baseLord: LordType, lordForComparison: LordType): RelationshipScore;
    findDirectionalStrength(): DirectionalStrength;
    findFunctionalRelation(): FunctionalRelation;
    findTemporaryRelation(): TemporaryRelationship;
    findTemporaryFriends(houseNumber: HouseNumberType): Set<LordType>;
    findTemporaryEnemies(houseNumber: HouseNumberType, lord: LordType): Set<LordType>;
    findLordsInEnemyHouse(): LordHouse[];
    findLordsInNeutralHouse(): LordHouse[];
    findLordsInFriendsHouse(): LordHouse[];
    findLordsRelationWithHouse(key: KeyType): LordHouse[];
}
export {};
