import Horoscope from './horoscope';
import {
    EXALTED_LORD,
    DEBILITATED_LORD,
    LordType,
    RASHI_OWN_LORD
} from './constants';

export default class Aspect {
    horoscope: Horoscope;
    exalted: LordType[];
    debilitated: LordType[];
    lordInOwnHouse: LordType[];

    constructor(horoscope: Horoscope) {
        this.horoscope = horoscope;
        this.exalted = [];
        this.debilitated = [];
        this.lordInOwnHouse = [];
    }

    findExaltatedLords(): LordType[] {
        for (let i = 1; i <= 12; i++) {
            const {rashi, lords} = this.horoscope.getHouse(i);

            lords.forEach((lord) => {
                if (rashi === EXALTED_LORD[lord]) {
                    this.exalted.push(lord);
                }
            });
        }

        return this.exalted;
    }

    findDebilitatedLords(): LordType[] {
        for (let i = 1; i <= 12; i++) {
            const { rashi, lords } = this.horoscope.getHouse(i);

            lords.forEach((lord) => {
                if (rashi === DEBILITATED_LORD[lord]) {
                    this.debilitated.push(lord);
                }
            });
        }

        return this.debilitated;
    }

    findLordsInOwnHouse(): LordType[] {
        for (let i = 1; i <= 12; i++) {
            const { rashi, lords } = this.horoscope.getHouse(i);

            const rashiOwnerLord = RASHI_OWN_LORD[rashi];

            if (lords.includes(rashiOwnerLord)) {
                this.lordInOwnHouse.push(rashiOwnerLord);
            }
        }

        return this.lordInOwnHouse;
    }

}
