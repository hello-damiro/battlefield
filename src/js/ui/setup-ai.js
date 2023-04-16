import { $, _$, getRandomBetween, getRandomBool } from '../helpers';
import { events } from '../pubsub';
import { grid } from '../..';

export const AISetup = (map, ships) => {
    let dockedShips = [];
    let selectedCell = { x: 0, y: 0 };
    let occupiedByFleet = [];

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

    function placeShips() {
        let occupiedByShip = [];
        ships.forEach((ship, index) => {
            let xInt = 0;
            let yInt = 0;
            let isVertical = false;
            const positionShip = () => {
                occupiedByShip = [];
                const coords = getRandomCell();
                xInt = coords.x;
                yInt = coords.y;
                isVertical = coords.vertical;
                const xLength = xInt + ship.length - 1;
                const yLength = yInt + ship.length - 1;
                const xLimit = Math.min(grid, xLength);
                const yLimit = Math.min(grid, yLength);

                for (let i = 0; i < ship.length; i++) {
                    const row = isVertical ? xInt : xInt + i;
                    const col = isVertical ? yInt + i : yInt;
                    if (row <= xLimit && col <= yLimit) {
                        // console.log('XY: ' + row + ', ' + col);
                        occupiedByShip.push([row, col]);
                    }
                }
                // console.log('SHIP: ' + occupiedByShip);
            };

            positionShip();

            let isOverlap = hasOverlap(occupiedByShip);
            console.log(index + ' OVERLAP: ' + isOverlap);
            while (isOverlap) {
                positionShip();
                isOverlap = hasOverlap(occupiedByShip);
            }

            const selector = getSelectorCoordinates(xInt, yInt);
            const cell = map.querySelector(selector);
            const nucleus = cell.querySelector('.nucleus');
            nucleus.classList.add(ship.type);
            if (isVertical) nucleus.classList.add('vertical');

            occupiedByFleet.push([...occupiedByShip]);
            // console.log('FLEET: ' + occupiedByFleet);
        });
    }

    listShips();

    return {
        placeShips: placeShips,
    };
};
