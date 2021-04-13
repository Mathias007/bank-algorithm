export class Randomize {
    // Universal randomize methods
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    getRandomNumber = (max) => {
        return Math.random() * max;
    };
}
