import Horoscope from './horoscope';
import { LordType, HouseNumberType } from './constants';
declare type LordHouseAspect = {
    [key in HouseNumberType]: LordType[];
};
export default class Aspect {
    horoscope: Horoscope;
    exalted: LordType[];
    debilitated: LordType[];
    lordInOwnHouse: LordType[];
    constructor(horoscope: Horoscope);
    findExaltatedLords(): LordType[];
    findDebilitatedLords(): LordType[];
    findLordsInOwnHouse(): LordType[];
    findLordAspectOnHouse(): LordHouseAspect;
}
export {};
