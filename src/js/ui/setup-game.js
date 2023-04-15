import { $, _$ } from '../helpers';
import { events } from '../pubsub';

export const SetupGame = (map, ships) => {
    let shipIndex = 0;
    let shipsInPlace = 0;
    let ship = ships[shipIndex];
    let isRotated = false;
    let selectedShip = { x: 0, y: 0 };
    let dockedShips = [];

    const startButton = $('.start');
    startButton.addEventListener('click', () => {
        $('.screen').classList.toggle('hidden');
        startButton.classList.add('hidden');
        events.emit('text-h3', "Light 'em up!");
    });

    function listShips() {
        ships.forEach((ship) => dockedShips.push(ship.type));
    }

    function listDockedShips() {
        const ul = $('.ship-lineup ul');
        ul.innerHTML = '';
        dockedShips.forEach((ship, index) => {
            const li = document.createElement('li');
            li.classList.add(dockedShips[index]);
            li.addEventListener('click', () => selectShip(index));
            ul.appendChild(li);
        });
    }

    function selectShip(index) {
        shipIndex = index;
        ship = dockedShips[index];
        const shipOnDock = $('.ship > div');
        shipOnDock.setAttribute('class', '');
        shipOnDock.classList.add(dockedShips[index]);
        const textH4 = $('.dock-name > h4');
        textH4.textContent = dockedShips[index];
        hideListItem(index);
    }

    function deleteFromList(index) {
        const items = _$('.ship-lineup ul li');
        items.forEach((item, i) => {
            if (i == index) {
                item.remove();
                dockedShips.splice(index, 1);
            }
        });
        shipIndex = 0;
        listDockedShips();
        selectShip(shipIndex);
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
            isRotated = !isRotated;
        });
    }

    function positionShip() {
        const cells = map.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            let isPermanent = false;
            const nucleus = cell.querySelector('.nucleus');
            cell.addEventListener('click', () => {
                isPermanent = true;
                hoverNucleusHandler(nucleus, dockedShips[shipIndex], true, isRotated, isPermanent);
                clickCellHandler(cell);
            });
            cell.addEventListener('mouseover', () =>
                hoverNucleusHandler(nucleus, dockedShips[shipIndex], true, isRotated, isPermanent)
            );
            cell.addEventListener('mouseout', () =>
                hoverNucleusHandler(nucleus, dockedShips[shipIndex], false, isRotated, isPermanent)
            );
        });
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
        deleteFromList(shipIndex);
        if (shipsInPlace === ships.length || dockedShips.length === 0) gameReady();
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
