import { $, _$ } from '../helpers';
import { events } from '../pubsub';
import { grid } from '../..';

export const SetupGame = (map, ships) => {
    let shipIndex = 0;
    let shipsInPlace = 0;
    let ship = ships[shipIndex];
    let isVertical = false;
    let selectedShip = { x: 0, y: 0 };
    let dockedShips = [];
    let occupiedCells = [];
    let occupiedByShip = [];

    function listShips() {
        ships.forEach((ship) => dockedShips.push(ship));
    }

    function listDockedShips() {
        const ul = $('.ship-lineup ul');
        ul.innerHTML = '';
        dockedShips.forEach((ship, index) => {
            const li = document.createElement('li');
            li.classList.add(dockedShips[index].type);
            li.addEventListener('click', () => selectShip(index));
            ul.appendChild(li);
        });
    }

    function selectShip(index) {
        shipIndex = index;
        ship = dockedShips[index];
        const shipOnDock = $('.ship > div');
        shipOnDock.setAttribute('class', '');
        shipOnDock.classList.add(dockedShips[shipIndex].type);
        const textH4 = $('.dock-name > h4');
        textH4.textContent = dockedShips[index].type;
    }

    function deleteFromList(index) {
        shipIndex = 0;
        const items = _$('.ship-lineup ul li');
        items.forEach((item, i) => {
            if (i == index) {
                item.remove();
                dockedShips.splice(index, 1);
            }
        });
        if (dockedShips.length != 0) {
            selectShip(shipIndex);
            listDockedShips();
        }
    }

    function rotateShip() {
        const shipOnDock = $('.dock > .ship');
        const rotateButton = $('.rotate');
        rotateButton.addEventListener('click', () => {
            shipOnDock.classList.toggle('config-vertical');
            isVertical = !isVertical;
        });
    }

    function positionShip() {
        const cells = map.querySelectorAll('.cell');
        cells.forEach((cell) => {
            let isPermanent = false;
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            const nucleus = cell.querySelector('.nucleus');

            const handleCellClick = () => {
                isPermanent = true;
                const length = dockedShips[shipIndex].length;
                const shipCells = getShipCells(x, y, length, isVertical);
                if (isAllowed(x, y, length, isVertical) && !hasOverlap(shipCells)) {
                    occupyCells(x, y, length, isVertical);
                    setShipInPlace(cell);
                }
            };

            const handleCellHover = (isOver) => {
                const { type, length } = dockedShips[shipIndex];
                const shipCells = getShipCells(x, y, length, isVertical);
                const isOverlap = hasOverlap(shipCells);
                const isValid = isAllowed(x, y, length, isVertical);
                if (isOverlap) highlightInvalid(x, y, length, isVertical, isOver);
                else if (isValid) hoverNucleus(nucleus, type, isOver, isVertical, isPermanent);
                else highlightInvalid(x, y, length, isVertical, isOver);
            };

            cell.addEventListener('click', () => handleCellClick());
            cell.addEventListener('mouseover', () => handleCellHover(true));
            cell.addEventListener('mouseout', () => handleCellHover(false));
        });
    }

    const getSelectorCoordinates = (x, y) => {
        if (isVertical) return `div.cell[data-x="${x}"][data-y="${y}"]`;
        else return `div.cell[data-x="${x}"][data-y="${y}"]`;
    };

    function occupyCells(x, y, length, vertical) {
        const xInt = parseInt(x);
        const yInt = parseInt(y);
        const xLength = xInt + length - 1;
        const yLength = yInt + length - 1;

        const occupyCell = (selector) => {
            const cell = map.querySelector(selector);
            if (cell) cell.classList.add('miss', 'no-click');
        };

        if (vertical) {
            for (let index = yInt; index <= yLength; index++) {
                const selector = getSelectorCoordinates(xInt, index);
                occupiedCells.push([xInt, index]);
                occupyCell(selector);
            }
        } else {
            for (let index = xInt; index <= xLength; index++) {
                const selector = getSelectorCoordinates(index, yInt);
                occupiedCells.push([index, yInt]);
                occupyCell(selector);
            }
        }
    }

    function getShipCells(x, y, length, vertical) {
        occupiedByShip = [];
        const grid = 10;
        const xInt = parseInt(x);
        const yInt = parseInt(y);
        const xLength = xInt + length - 1;
        const yLength = yInt + length - 1;
        const xLimit = Math.min(grid, xLength);
        const yLimit = Math.min(grid, yLength);
        for (let i = 0; i < length; i++) {
            const row = vertical ? xInt : xInt + i;
            const col = vertical ? yInt + i : yInt;
            if (row <= xLimit && col <= yLimit) {
                occupiedByShip.push([row, col]);
            }
        }
        return occupiedByShip;
    }

    function hasOverlap(ship) {
        let isOverlap = false;
        for (let i = 0; i < ship.length; i++) {
            const [x, y] = ship[i];
            isOverlap = occupiedCells.some((cell) => cell[0] === x && cell[1] === y);
            if (isOverlap) return true;
        }
        return isOverlap;
    }

    function isAllowed(x, y, length, vertical) {
        const xInt = parseInt(x) + length - 1;
        const yInt = parseInt(y) + length - 1;
        const limit = vertical ? yInt : xInt;
        return limit <= grid;
    }

    function highlightInvalid(x, y, length, vertical, over) {
        const xInt = parseInt(x);
        const yInt = parseInt(y);
        const xLength = xInt + length - 1;
        const yLength = yInt + length - 1;
        const xLimit = Math.min(grid, xLength);
        const yLimit = Math.min(grid, yLength);

        const toggleCellHitClass = (selector, over) => {
            const cell = map.querySelector(selector);
            if (cell) {
                if (over) cell.classList.add('hit');
                else cell.classList.remove('hit');
            }
        };

        if (vertical) {
            for (let index = yInt; index <= yLimit; index++) {
                const selector = getSelectorCoordinates(xInt, index);
                toggleCellHitClass(selector, over);
            }
        } else {
            for (let index = xInt; index <= xLimit; index++) {
                const selector = getSelectorCoordinates(index, yInt);
                toggleCellHitClass(selector, over);
            }
        }
    }

    function hoverNucleus(nucleus, type, over, rotated, permanent) {
        nucleus.setAttribute('class', ''); // to clear a render bug
        if (over) {
            nucleus.classList.add(type);
            if (rotated) nucleus.classList.add('vertical');
        } else {
            if (!permanent) {
                nucleus.classList.remove(type);
                nucleus.classList.remove('vertical');
            }
        }
    }

    function setShipInPlace(cell) {
        const { x, y } = cell.dataset;
        selectedShip = { ...selectedShip, x, y };
        cell.classList.add('no-click');

        shipsInPlace++;

        if (shipsInPlace === ships.length) gameReady();
        else deleteFromList(shipIndex);
    }

    function gameReady() {
        $('.dock-group').classList.toggle('hidden');
        $('.ship-lineup').classList.toggle('hidden');
        startButton.classList.remove('hidden');
        events.emit('text-h3', 'Engage enemy!');
        events.emit('disable-map', true);
    }

    const startButton = $('.start');
    startButton.addEventListener('click', () => {
        $('.screen').classList.toggle('hidden');
        startButton.classList.add('hidden');
        events.emit('text-h3', "Light 'em up!");
    });

    listShips();
    selectShip(shipIndex);
    listDockedShips();
    rotateShip();
    positionShip();
};
