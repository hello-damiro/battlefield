import { $, _$, getRandomBetween, getRandomBool } from '../helpers';
import { events } from '../pubsub';
import { grid } from '../..';

export const AISetup = (map, ships) => {
    let dockedShips = [];
    let selectedCell = { x: 0, y: 0 };
    const cells = map.querySelectorAll('.cell');

    function listShips() {
        ships.forEach((ship) => dockedShips.push(ship));
    }

    const getCoordinatesSelector = (x, y, isVertical) => {
        if (isVertical) return `div.cell[data-x="${x}"][data-y="${y}"]`;
        else return `div.cell[data-x="${x}"][data-y="${y}"]`;
    };

    function getRandomCell() {
        const randomX = getRandomBetween(1, 10);
        const randomY = getRandomBetween(1, 10);
        return { x: randomX, y: rendomY };
    }

    function placeShips() {}

    listShips();

    return {
        getRandomCell: getRandomCell,
    };
};
