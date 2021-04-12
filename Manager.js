import { Bank } from "./Bank.js";

const banksList = ["Agricole", "Millenium", "Pekao SA", "Nest Bank"];
const initialAccountState = 15000;

let banksInstances = [];

banksList.forEach((bankName) => {
    banksInstances.push(new Bank(bankName, initialAccountState));
});

banksInstances.forEach((bank) => bank.startOperating());

export class Manager {
    comparePercentageAndTransfer = () => {
        let percentageToCompare;
        let bestBankAtThisMoment;

        percentageToCompare = banksInstances[0].percentage;
        bestBankAtThisMoment = banksInstances[0];

        if (banksInstances[1].percentage > percentageToCompare) {
            percentageToCompare = banksInstances[1].percentage;
            bestBankAtThisMoment = banksInstances[1];
        }

        if (banksInstances[2].percentage > percentageToCompare) {
            percentageToCompare = banksInstances[2].percentage;
            bestBankAtThisMoment = banksInstances[2];
        }

        if (banksInstances[3].percentage > percentageToCompare) {
            percentageToCompare = banksInstances[3].percentage;
            bestBankAtThisMoment = banksInstances[3];
        }

        console.log(
            `Najkorzystniejsze oprocentowanie występuje obecnie w banku ${bestBankAtThisMoment.bankName} i wynosi ${percentageToCompare}`
        );

        this.transferResourcesBetweenAccounts(
            percentageToCompare,
            bestBankAtThisMoment
        );
    };

    transferResourcesBetweenAccounts = (bestPercentage, bestBank) => {
        if (
            bestPercentage > banksInstances[0].transferProvision &&
            banksInstances[0].accountState > 0
        ) {
            bestBank.accountState += banksInstances[0].accountState;
            banksInstances[0].accountState = 0;
            console.log(
                `transfer środków z ${banksInstances[0].bankName} do ${bestBank.bankName}`
            );
        }

        if (
            bestPercentage > banksInstances[1].transferProvision &&
            banksInstances[1].accountState > 0
        ) {
            bestBank.accountState += banksInstances[1].accountState;
            banksInstances[1].accountState = 0;
            console.log(
                `transfer środków z ${banksInstances[1].bankName} do ${bestBank.bankName}`
            );
        }

        if (
            bestPercentage > banksInstances[2].transferProvision &&
            banksInstances[2].accountState > 0
        ) {
            bestBank.accountState += banksInstances[2].accountState;
            banksInstances[2].accountState = 0;
            console.log(
                `transfer środków z ${banksInstances[2].bankName} do ${bestBank.bankName}`
            );
        }

        if (
            bestPercentage > banksInstances[3].transferProvision &&
            banksInstances[3].accountState > 0
        ) {
            bestBank.accountState += banksInstances[3].accountState;
            banksInstances[3].accountState = 0;
            console.log(
                `transfer środków z ${banksInstances[3].bankName} do ${bestBank.bankName}`
            );
        }
    };

    updateAccountSituation = (refreshTime) => {
        setInterval(this.comparePercentageAndTransfer, refreshTime);
    };
}


