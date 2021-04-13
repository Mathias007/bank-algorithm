import { Manager } from "./Manager.js";
import { Bank } from "./Bank.js";

const banksList = ["Agricole", "Millenium", "Pekao SA", "Nest Bank"];
const initialAccountState = 15000;

let banksInstances = [];

banksList.forEach((bankName) => {
    banksInstances.push(new Bank(bankName, initialAccountState));
});

banksInstances.forEach((bank) => bank.startOperating());

const manager = new Manager();
manager.updateAccountSituation(5000, banksInstances);
