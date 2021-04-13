export class Manager {
    comparePercentageAndTransfer = (banksCollection) => {
        let percentageArray = [];

        let bestPercentageAtThisMoment;
        let bestBankAtThisMoment;

        banksCollection.forEach((bank, index) => {
            percentageArray.push(parseFloat(bank.percentage));
            console.log(`oprocentowanie w ${bank.bankName}:`, bank.percentage);
        });

        bestPercentageAtThisMoment = Math.max(...percentageArray);
        bestBankAtThisMoment = banksCollection.find(
            (bank) => bank.percentage == bestPercentageAtThisMoment
        );

        console.log(
            `Najkorzystniejsze oprocentowanie występuje obecnie w banku ${bestBankAtThisMoment.bankName} i wynosi ${bestPercentageAtThisMoment}`
        );

        this.transferResourcesBetweenAccounts(
            bestPercentageAtThisMoment,
            bestBankAtThisMoment,
            banksCollection
        );
    };

    transferResourcesBetweenAccounts = (
        bestPercentage,
        bestBank,
        banksCollection
    ) => {
        banksCollection.forEach((bank, index) => {
            if (
                bestPercentage > bank.transferProvision &&
                bank.accountState > 0
            ) {
                bestBank.accountState +=
                    bank.accountState -
                    bank.accountState * (bank.transferProvision / 100);
                bank.accountState = 0;
                console.log(
                    `transfer środków z ${bank.bankName} do ${bestBank.bankName}`
                );
            }
        });
    };

    updateAccountSituation = (refreshTime, banksCollection) => {
        setInterval(
            this.comparePercentageAndTransfer(banksCollection),
            refreshTime
        );
    };
}
