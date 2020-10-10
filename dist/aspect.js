import { EXALTED_LORD, DEBILITATED_LORD, LORD_FULL_ASPECT, RASHI_OWN_LORD } from './constants';
export default class Aspect {
    constructor(horoscope) {
        this.horoscope = horoscope;
        this.exalted = [];
        this.debilitated = [];
        this.lordInOwnHouse = [];
    }
    findExaltatedLords() {
        for (let i = 1; i <= 12; i++) {
            const { rashi, lords } = this.horoscope.getHouse(i);
            lords.forEach((lord) => {
                if (rashi === EXALTED_LORD[lord]) {
                    this.exalted.push(lord);
                }
            });
        }
        return this.exalted;
    }
    findDebilitatedLords() {
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
    findLordsInOwnHouse() {
        for (let i = 1; i <= 12; i++) {
            const { rashi, lords } = this.horoscope.getHouse(i);
            const rashiOwnerLord = RASHI_OWN_LORD[rashi];
            if (lords.includes(rashiOwnerLord)) {
                this.lordInOwnHouse.push(rashiOwnerLord);
            }
        }
        return this.lordInOwnHouse;
    }
    findLordAspectOnHouse() {
        const lordHouseAspect = {};
        for (let houseNumber = 1; houseNumber <= 12; houseNumber++) {
            lordHouseAspect[houseNumber] = [];
        }
        for (let houseNumber = 1; houseNumber <= 12; houseNumber++) {
            const { lords } = this.horoscope.getHouse(houseNumber);
            lords.forEach((lord) => {
                const aspectedHouses = LORD_FULL_ASPECT[lord];
                if (Array.isArray(aspectedHouses) && aspectedHouses.length) {
                    aspectedHouses
                        .map((aspectedHouse) => {
                        const adjustedHouse = aspectedHouse + houseNumber - 1;
                        return adjustedHouse > 12
                            ? adjustedHouse % 12
                            : adjustedHouse;
                    })
                        .forEach((aspectedHouse) => {
                        lordHouseAspect[aspectedHouse].push(lord);
                    });
                }
            });
        }
        return lordHouseAspect;
    }
}
