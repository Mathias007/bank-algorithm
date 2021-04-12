export class Bank {
    constructor(bankName, accountState) {
        this.bankName = bankName;
        this.accountState = accountState;
    }

    capitalizationCycle; // seconds
    percentage; // percent
    transferProvision; // percent

    // Universal randomize methods
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    getRandomNumber = (max) => {
        return Math.random() * max;
    };

    // Bank parameters handlers

    establishCycleDuration = (min, max) => {
        return this.getRandomInt(min, max);
    };

    getBankProvistion = (min, max) => {
        return this.getRandomInt(min, max);
    };

    getBankPercentage = (maxPercentage) => {
        return this.getRandomNumber(maxPercentage).toFixed(2);
    };

    calculateState = () => {
        console.group(`Bank ${this.bankName} - cykliczna aktualizacja`);
        console.log(`Stan konta przed kapitalizacją: ${this.accountState}`);
        console.log(
            `Wartość kapitalizacji: ${
                (this.accountState * this.percentage) / 100
            }`
        );
        this.accountState = (
            this.accountState *
            (1 + this.percentage / 100)
        ).toFixed(2);
        console.log(`Stan konta po kapitalizacji: ${this.accountState} zł`);
        console.groupEnd();
    };

    updateBankPercentage = (maxPercentage) => {
        return setInterval(() => {
            this.numberOfCycles++;
            this.calculateState();
            this.percentage = this.getRandomNumber(maxPercentage).toFixed(2);

            console.log(
                `Aktualne oprocentowanie lokaty wynosi ${this.percentage}%`
            );
        }, this.capitalizationCycle * 1000);
    };

    startOperating() {
        this.capitalizationCycle = this.establishCycleDuration(5, 10); // seconds
        this.percentage = this.getBankPercentage(15); // percent
        this.transferProvision = this.getBankProvistion(1, 15); // percent

        console.log(
            `Witamy w banku ${this.bankName}! Oprocentowanie lokat w naszym banku następuje w ${this.capitalizationCycle}-sekundowych cyklach kapitalizacyjnych. Obecnie wynosi ono ${this.percentage}%. 
            Za przelew środków z lokaty pobieramy prowizję w wysokości ${this.transferProvision}% wartości transakcji.`
        );

        this.updateBankPercentage(15);
    }
}
