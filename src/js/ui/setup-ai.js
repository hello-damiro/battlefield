import { $, _$, getRandomBetween, getRandomBool } from '../helpers';
import { events } from '../pubsub';
import { grid } from '../..';

export const AISetup = (map, ships) => {
    let dockedShips = [];
    let selectedCell = { x: 0, y: 0 };
    let occupiedCells = [];
    let occupiedByShip = [];

    function listShips() {
        ships.forEach((ship) => dockedShips.push(ship));
    }

    const getSelectorCoordinates = (x, y, isVertical) => {
        if (isVertical) return `div.cell[data-x="${x}"][data-y="${y}"]`;
        else return `div.cell[data-x="${x}"][data-y="${y}"]`;
    };

    function getRandomCell() {
        const randomX = getRandomBetween(1, 10);
        const randomY = getRandomBetween(1, 10);
        const isVertical = getRandomBool();
        return { x: randomX, y: randomY, vertical: isVertical };
    }

    function placeShips() {
        ships.forEach((ship) => {
            const coords = getRandomCell();
            const xInt = coords.x;
            const yInt = coords.y;
            const isVertical = coords.vertical;
            const xLength = xInt + ship.length - 1;
            const yLength = yInt + ship.length - 1;
            occupiedByShip = [];

            if (isVertical) {
                for (let index = yInt; index <= yLength; index++) {
                    const selector = getSelectorCoordinates(xInt, index);
                    const cell = map.querySelector(selector);
                    if (cell) cell.classList.add('miss');
                }
                console.log(coords);
            } else {
                for (let index = xInt; index <= xLength; index++) {
                    if (cell) cell.classList.add('miss');
                }
                console.log(coords);
            }
            const selector = getSelectorCoordinates(xInt, yInt);
            const cell = map.querySelector(selector);
            const nucleus = cell.querySelector('.nucleus');
            nucleus.classList.add(ship.type);
            if (isVertical) nucleus.classList.add('vertical');
        });
    }

    listShips();

    return {
        placeShips: placeShips,
    };
};
