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

/**
 * The function creates an instance of a dynamically named class with a given instance name.
 * @param className - The name of the class that you want to create an instance of.
 * @param instanceName - The instanceName parameter is a string that represents the name of the
 * instance that will be created. It will be used as an argument to create a new instance of the
 * dynamic class.
 * @returns an instance of the dynamically created class with the specified instance name.
 */
export function createInstance(className, instanceName) {
    const dynamicClass = window[className];
    const instance = new dynamicClass(instanceName);
    instance.name = instanceName;
    return instance;
}
