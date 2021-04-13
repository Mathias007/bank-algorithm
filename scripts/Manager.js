export class Manager {
    reportFinances = (banksCollection) => {
        let summaryResources = 0;

        banksCollection.forEach((bank, index) => {
            console.log(
                `Wyciąg z konta w banku ${bank.bankName}: ${bank.accountState}zł.`
            );
            summaryResources += parseFloat(bank.accountState);
        });

        console.log(
            `Na wszystkich kontach posiadasz aktualnie łącznie: ${summaryResources}zł.`
        );
    };

    compareAccountsProfitability = (banksCollection) => {
        let percentageArray = [];

        let bestPercentageAtThisMoment;
        let bestBankAtThisMoment;

        banksCollection.forEach((checkedBank, index) => {
            percentageArray.push(parseFloat(checkedBank.percentage));
        });

        bestPercentageAtThisMoment = Math.max(...percentageArray);
        bestBankAtThisMoment = banksCollection.find(
            (checkedBank) =>
                checkedBank.percentage == bestPercentageAtThisMoment
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
        banksCollection.forEach((checkedBank, index) => {
            if (
                bestPercentage > checkedBank.transferProvision &&
                checkedBank.accountState > 0
            ) {
                bestBank.accountState +=
                    checkedBank.accountState -
                    checkedBank.accountState *
                        (checkedBank.transferProvision / 100);
                checkedBank.accountState = 0;
                console.log(
                    `transfer środków z ${checkedBank.bankName} do ${bestBank.bankName}`
                );
            }
        });
    };

    updateFinancialSituation = (refreshTime, banksCollection) => {
        setInterval(
            () => this.compareAccountsProfitability(banksCollection),
            refreshTime
        );
    };

    showFinancialSituation = (reportTime, banksCollection) => {
        setInterval(() => this.reportFinances(banksCollection), reportTime);
    };
}
