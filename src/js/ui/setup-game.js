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

    const startButton = $('.start');
    startButton.addEventListener('click', () => {
        $('.screen').classList.toggle('hidden');
        startButton.classList.add('hidden');
        events.emit('text-h3', "Light 'em up!");
    });

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
        hideListItem(index);
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

    function hideListItem(index) {
        const items = _$('.ship-lineup ul li');
        items.forEach((item, i) => {
            item.classList.remove('hidden');
            if (i == index) item.classList.add('hidden');
        });
    }

    function rotateShip() {
        const ship = $('.dock > .ship');
        const rotateButton = $('.rotate');
        rotateButton.addEventListener('click', () => {
            ship.classList.toggle('config-vertical');
            isVertical = !isVertical;
        });
    }

    function positionShip() {
        const cells = map.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            let isPermanent = false;
            const nucleus = cell.querySelector('.nucleus');
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            cell.addEventListener('click', () => {
                isPermanent = true;
                const type = dockedShips[shipIndex].type;
                const length = dockedShips[shipIndex].length;
                if (isAllowed(x, y, length, isVertical)) {
                    hoverNucleusHandler(nucleus, type, true, isVertical, isPermanent);
                    clickCellHandler(cell);
                    reserveCells(x, y, length, isVertical);
                }
            });
            cell.addEventListener('mouseover', () => {
                const type = dockedShips[shipIndex].type;
                const length = dockedShips[shipIndex].length;
                if (isAllowed(x, y, length, isVertical))
                    hoverNucleusHandler(nucleus, type, true, isVertical, isPermanent);
                else highlightInvalid(x, y, isVertical, true);
            });
            cell.addEventListener('mouseout', () => {
                const type = dockedShips[shipIndex].type;
                const length = dockedShips[shipIndex].length;
                if (isAllowed(x, y, length, isVertical))
                    hoverNucleusHandler(nucleus, type, false, isVertical, isPermanent);
                else highlightInvalid(x, y, isVertical, false);
            });
        });
    }

    function isAllowed(x, y, length, vertical) {
        const xInt = parseInt(x) + length - 1;
        const yInt = parseInt(y) + length - 1;
        let isAllowed = false;
        if (vertical) isAllowed = grid >= yInt ? true : false;
        else isAllowed = grid >= xInt ? true : false;
        return isAllowed;
    }

    function reserveCells(x, y, length, vertical) {
        let xInt = parseInt(x);
        let yInt = parseInt(y);
        let xLength = xInt + length - 1;
        let yLength = yInt + length - 1;
        let cell = '';
        if (vertical) {
            for (let index = y - 1; index < yLength; index++) {
                console.log(index + ': ' + xInt + ' - ' + length);
                const selector = 'div.cell[data-x="' + xInt + '"][data-y="' + (index + 1) + '"]';
                cell = map.querySelector(selector);
                cell.classList.add('miss', 'no-click');
            }
        } else {
            for (let index = x - 1; index < xLength; index++) {
                console.log(index + ': ' + xInt + ' - ' + length);
                const selector = 'div.cell[data-x="' + (index + 1) + '"][data-y="' + yInt + '"]';
                cell = map.querySelector(selector);
                cell.classList.add('miss', 'no-click');
            }
        }
    }

    function highlightInvalid(x, y, vertical, over) {
        let xInt = parseInt(x);
        let yInt = parseInt(y);
        let cell = '';
        if (vertical) {
            for (let index = y - 1; index < grid; index++) {
                const selector = 'div.cell[data-x="' + xInt + '"][data-y="' + (index + 1) + '"]';
                cell = map.querySelector(selector);
                if (over) cell.classList.add('hit');
                else cell.classList.remove('hit');
            }
        } else {
            for (let index = x - 1; index < grid; index++) {
                const selector = 'div.cell[data-x="' + (index + 1) + '"][data-y="' + yInt + '"]';
                cell = map.querySelector(selector);
                if (over) cell.classList.add('hit');
                else cell.classList.remove('hit');
            }
        }
    }

    function hoverNucleusHandler(nucleus, type, over, rotated, permanent) {
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

    function clickCellHandler(cell) {
        selectedShip.x = cell.getAttribute('data-x');
        selectedShip.y = cell.getAttribute('data-y');
        cell.classList.add('no-click');
        shipsInPlace++;
        if (shipsInPlace == ships.length) gameReady();
        else deleteFromList(shipIndex);
        // events.emit('cell-XY', selectedShip);
    }

    function gameReady() {
        $('.dock-group').classList.toggle('hidden');
        $('.ship-lineup').classList.toggle('hidden');
        startButton.classList.remove('hidden');
        events.emit('text-h3', 'Engage enemy!');
        events.emit('disable-map', true);
    }

    listShips();
    listDockedShips();
    rotateShip();
    selectShip(shipIndex);
    positionShip();
};
