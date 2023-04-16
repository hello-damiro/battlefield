/**
 * The function creates a Ship object with a given length and methods to track hits and determine if
 * the ship is sunk.
 * @param length - The length parameter is the length of the ship being created. It is used to
 * determine how many hits are required to sink the ship.
 * @returns An object with properties `length`, `hits`, `hit`, and `isSunk`. The `length` property is
 * set to the value passed as an argument to the `Ship` function. The `hits` property is initialized to
 * 0 and can be incremented by calling the `hit` method. The `isSunk` method returns `true` if the
 * number of hits is equal
 */
export class Ship {
    constructor(type, cells) {
        this.type = type;
        this.cells = cells;
        this.hits = 0;
    }

    isSunk() {
        return this.hits === this.cells.length;
    }

    hit() {
        this.hits++;
    }
}
