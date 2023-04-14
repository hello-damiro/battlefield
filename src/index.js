import './styles/style.css';
import { $, _$ } from './js/helpers';
import { createMap } from './js/create-map';

const ships = [
    { type: 'carrier', length: 5 },
    { type: 'battleship', length: 4 },
    { type: 'cruiser', length: 4 },
    { type: 'submarine', length: 3 },
    { type: 'destroyer', length: 2 },
];

const grid = 10;

const map = $('.main-map');
const miniMap = $('.monitor-map');
const rotateButton = $('.rotate');

createMap(map, grid);
createMap(miniMap, grid, true).disableCells();

const cells = _$('.cell');
let shipIndex = 0;
let ship = ships[shipIndex];

let rotate = false;

function listShips() {
    const ul = $('.ship-lineup ul');
    ships.forEach((ship, index) => {
        const li = document.createElement('li');
        li.classList.add(ship.type);
        ul.appendChild(li);
        li.addEventListener('click', () => selectShip(index));
    });
}

function selectShip(index) {
    shipIndex = index;
    ship = ships[index];

    const shipOnDock = $('.ship > div');
    shipOnDock.setAttribute('class', '');
    shipOnDock.classList.add(ship.type);

    const shipH4 = $('.current-ship > h4');
    shipH4.textContent = ship.type;

    console.log(index + ': ' + rotate + ' ' + ship.type);
}

selectShip(shipIndex);

function rotateShip() {
    const ship = $('.dock > .ship');
    rotateButton.addEventListener('click', () => {
        ship.classList.toggle('config-vertical');
        rotate = !rotate;
    });
}

function positionShip() {
    // if (!type) return;
    cells.forEach((cell) => {
        let set = false;
        const nucleus = cell.querySelector('.nucleus');
        cell.addEventListener('click', () => {
            set = true;
            cell.classList.add('no-click');
            cell.classList.add('empty');
            nucleus.classList.add(ship.type);
            if (rotate) nucleus.classList.add('vertical');
        });
        cell.addEventListener('mouseover', () => {
            nucleus.classList.add(ship.type);
            if (rotate) nucleus.classList.add('vertical');
        });
        cell.addEventListener('mouseout', () => {
            if (!set) {
                nucleus.classList.remove(ship.type);
                nucleus.classList.remove('vertical');
            }
        });
    });
}

rotateShip();
listShips();
positionShip();
