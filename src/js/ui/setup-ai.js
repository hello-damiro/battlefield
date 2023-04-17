import { $, _$, getRandomBetween, getRandomBool } from '../helpers';
import { events } from '../pubsub';
import { grid } from '../constants';
import { Ship } from '../ship';

export const AISetup = (map, ships) => {
    let dockedShips = [];
    let occupiedByFleet = [];
    let navy = [];

    function listShips() {
        ships.forEach((ship) => dockedShips.push(ship));
    }

    const getSelectorCoordinates = (x, y, isVertical) => {
        if (isVertical) return `div.cell[data-x="${x}"][data-y="${y}"]`;
        else return `div.cell[data-x="${x}"][data-y="${y}"]`;
    };

    function getRandomCell() {
        const randomX = getRandomBetween(1, grid);
        const randomY = getRandomBetween(1, grid);
        const isVertical = getRandomBool();
        return { x: randomX, y: randomY, vertical: isVertical };
    }

    function hasOverlap(ship) {
        for (let i = 0; i < ship.length; i++) {
            if (
                occupiedByFleet.some((cells) =>
                    cells.some((cell) => ship[i].toString() === cell.toString())
                )
            )
                return true; // console.log(ship[i] + ' overlaps with occupied cell');
        }
        return false;
    }

    function isBounded(x, y, length, vertical) {
        const xInt = parseInt(x) + length - 1;
        const yInt = parseInt(y) + length - 1;
        const limit = vertical ? yInt : xInt;
        if (limit <= grid) return true;
        return false;
    }

    function createShip(index, cells) {
        const ship = new Ship();
        ship.type = dockedShips[index].type;
        ship.cells = cells;
        navy.push(ship);
        events.emit('ai-navy', navy);
    }

    function revealAllShips(show) {
        navy.forEach((ship, index) => revealShip(index, show));
    }

    function revealShip(index, show) {
        const x = navy[index].cells[0][0];
        const x2 = navy[index].cells[1][0];
        const y = navy[index].cells[0][1];
        const selector = getSelectorCoordinates(x, y);
        const cell = map.querySelector(selector);
        const nucleus = cell.querySelector('.nucleus');
        if (show) {
            nucleus.classList.add(navy[index].type);
            if (x === x2) nucleus.classList.add('vertical');
        } else {
            nucleus.classList.remove(navy[index].type);
            if (x === x2) nucleus.classList.remove('vertical');
        }
    }

    function placeShips() {
        let occupiedByShip = [];
        ships.forEach((ship, index) => {
            let x = 0;
            let y = 0;
            let isVertical = false;

            const placeShip = () => {
                const coords = getRandomCell();
                occupiedByShip = [];
                x = coords.x;
                y = coords.y;
                isVertical = coords.vertical;
                const xLength = x + ship.length - 1;
                const yLength = y + ship.length - 1;
                const xLimit = Math.min(grid, xLength);
                const yLimit = Math.min(grid, yLength);

                for (let i = 0; i < ship.length; i++) {
                    const row = isVertical ? x : x + i;
                    const col = isVertical ? y + i : y;
                    if (row <= xLimit && col <= yLimit) {
                        // console.log('XY: ' + row + ', ' + col);
                        occupiedByShip.push([row, col]);
                    }
                }
            };

            placeShip();

            let isContained = isBounded(x, y, ship.length, isVertical);
            let isOverlap = hasOverlap(occupiedByShip);
            while (isOverlap || !isContained) {
                placeShip();
                isOverlap = hasOverlap(occupiedByShip);
                isContained = isBounded(x, y, ship.length, isVertical);
            }

            occupiedByFleet.push([...occupiedByShip]);
            createShip(index, occupiedByShip);
        });
    }

    listShips();
    placeShips();

    return {
        placeShips: placeShips,
        revealShip: revealShip,
        revealAllShips: revealAllShips,
        occupiedByFleet: occupiedByFleet,
    };
};
