import { Randomize } from "./Randomize.js";

export class Bank extends Randomize {
    constructor(bankName, accountState) {
        super();
        this.bankName = bankName;
        this.accountState = accountState;
    }

    capitalizationCycle;
    percentage;
    transferProvision;

    establishCycleDuration = (min, max) => {
        return this.getRandomInt(min, max);
    };

    getBankProvision = (min, max) => {
        return this.getRandomInt(min, max);
    };

    getBankPercentage = (maxPercentage) => {
        return this.getRandomNumber(maxPercentage).toFixed(2);
    };

    calculateState = () => {
        console.group(`Bank ${this.bankName} - cykliczna aktualizacja`);
        console.log(`Stan konta przed kapitalizacją: ${this.accountState}`);
        console.log(
            `Wartość kapitalizacji: ${(
                (this.accountState * this.percentage) /
                100
            ).toFixed(2)}`
        );

        this.accountState = (
            this.accountState *
            (1 + this.percentage / 100)
        ).toFixed(2);

        console.log(
            `Stan konta ${this.bankName} po kapitalizacji: ${this.accountState} zł`
        );
        console.groupEnd();
    };

    updateBankPercentage = (maxPercentage) => {
        return setInterval(() => {
            this.calculateState();
            this.percentage = this.getRandomNumber(maxPercentage).toFixed(2);

            console.log(
                `Aktualne oprocentowanie lokaty wynosi ${this.percentage}%`
            );
        }, this.capitalizationCycle * 1000);
    };

    startOperating() {
        this.capitalizationCycle = this.establishCycleDuration(5, 10);
        this.percentage = this.getBankPercentage(20);
        this.transferProvision = this.getBankProvision(1, 15);

        console.log(
            `Witamy w banku ${this.bankName}! Oprocentowanie lokat w naszym banku następuje w ${this.capitalizationCycle}-sekundowych cyklach kapitalizacyjnych. Obecnie wynosi ono ${this.percentage}%.
            Za przelew środków z lokaty pobieramy prowizję w wysokości ${this.transferProvision}% wartości transakcji.`
        );

        this.updateBankPercentage(15);
    }
}
