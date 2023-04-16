export let $ = (selector) => document.querySelector(selector);
export let _$ = (selector) => document.querySelectorAll(selector);

export function getTimer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

// Random number between 2 number
export function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Random number from 1 to a number
export function getRandomTo(num) {
    return getRandomBetween(1, num);
}

// Random boolean true or false
export function getRandomBool() {
    return getRandomBetween(0, 1) == 1 ? true : false;
}
