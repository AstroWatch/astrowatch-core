import Horoscope from './horoscope';
import {
    EXALTED_LORD,
    DEBILITATED_LORD,
    LORD_FULL_ASPECT,
    LordType,
    HouseNumberType,
    RASHI_OWN_LORD
} from './constants';

type LordHouseAspect = {
    [key in HouseNumberType]: LordType[];
}

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

    findLordAspectOnHouse(): LordHouseAspect {
        const lordHouseAspect = {} as LordHouseAspect;

        // Initialize
        for (let houseNumber = 1; houseNumber <= 12; houseNumber++) {
            lordHouseAspect[houseNumber as HouseNumberType] = [];
        }

        for (let houseNumber = 1; houseNumber <= 12; houseNumber++) {
            const { lords } = this.horoscope.getHouse(houseNumber);

            lords.forEach((lord) => {
                const aspectedHouses = LORD_FULL_ASPECT[lord];

                if (Array.isArray(aspectedHouses) && aspectedHouses.length) {
                    aspectedHouses
                        // Adjust the aspect from ascendant
                        .map((aspectedHouse) => {
                            const adjustedHouse = aspectedHouse + houseNumber - 1;

                            return adjustedHouse > 12
                                ? adjustedHouse % 12
                                : adjustedHouse;
                        })
                        // Add to result
                        .forEach((aspectedHouse: HouseNumberType) => {
                            lordHouseAspect[aspectedHouse].push(lord);
                        });
                }
            });
        }

        return lordHouseAspect;
    }

}
