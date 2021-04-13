export class Randomize {
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    getRandomNumber = (max) => {
        return Math.random() * max;
    };
}
