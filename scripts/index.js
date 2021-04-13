import { Manager } from "./Manager.js";
import { Bank } from "./Bank.js";

const banksList = ["Agricole", "Millenium", "Pekao SA", "Nest Bank"];
const initialAccountState = 15000;
const updateIntervalTime = 5000;
const reportIntervalTime = 60000;

let banksInstances = [];

banksList.forEach((bankName) => {
    banksInstances.push(new Bank(bankName, initialAccountState));
});

banksInstances.forEach((bank) => bank.startOperating());

const manager = new Manager();
manager.updateFinancialSituation(updateIntervalTime, banksInstances);
manager.showFinancialSituation(reportIntervalTime, banksInstances);
