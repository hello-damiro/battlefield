import { $, _$ } from '../helpers';
import { events } from '../pubsub';

export const playerSetUp = (ships) => {
    let shipIndex = 0;
    let shipsInPlace = 0;
    let ship = ships[shipIndex];
    let isRotated = false;
    let selectedShip = { x: 0, y: 0 };
    let dockedShipList = [];

    const startButton = $('.start');
    startButton.addEventListener('click', () => {
        $('.screen').classList.toggle('hidden');
        $('.dock-group').classList.toggle('hidden');
        $('.ship-lineup').classList.toggle('hidden');
        startButton.classList.add('hidden');
    });

    function gameReady() {
        if (shipsInPlace === 5) {
            // map.disableCells(); // call if player setup is done
            startButton.classList.remove('hidden');
            const textH3 = $('.configure-ship > h3');
            textH3.textContent = 'Engage enemy!';
        }
    }

    function listShips() {
        ships.forEach((ship) => dockedShipList.push(ship.type));
    }

    function renderDockedShips() {
        listShips();
        const ul = $('.ship-lineup ul');
        dockedShipList.forEach((ship, index) => {
            const li = document.createElement('li');
            li.classList.add(dockedShipList[index]);
            li.addEventListener('click', () => selectShip(index));
            ul.appendChild(li);
        });
    }

    function selectShip(index) {
        shipIndex = index;
        ship = ships[index];
        const shipOnDock = $('.ship > div');
        shipOnDock.setAttribute('class', '');
        shipOnDock.classList.add(ship.type);
        const textH4 = $('.dock-name > h4');
        textH4.textContent = ship.type;
        // console.log(index + ': ' + isRotated + ' ' + ship.type);
    }

    function hideListItem(index) {
        const items = _$('.ship-lineup ul li');
        items.forEach((item, i) => {
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
        const cells = _$('.monitor-map .cell');
        cells.forEach((cell) => {
            let isPermanent = false;
            const nucleus = cell.querySelector('.nucleus');
            cell.addEventListener('click', () => {
                isPermanent = true;
                hoverNucleusHandler(nucleus, ship.type, true, isRotated, isPermanent);
                clickCellHandler(cell);
            });
            cell.addEventListener('mouseover', () =>
                hoverNucleusHandler(nucleus, ship.type, true, isRotated, isPermanent)
            );
            cell.addEventListener('mouseout', () =>
                hoverNucleusHandler(nucleus, ship.type, false, isRotated, isPermanent)
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
        events.emit('cell-XY', selectedShip);
    }

    renderDockedShips();
    // hideListItem(1);
    rotateShip();
    selectShip(shipIndex);
    positionShip();
};
