import './styles/style.css';
import { $, _$ } from './js/helpers';
import { createMap } from './js/create-map';

const map = $('.main-map');
const miniMap = $('.monitor-map');
const shipsLineup = $('.ship-lineup ul');
const rotate = $('.rotate');
const grid = 10;

createMap(map, grid);
createMap(miniMap, grid, true).disableCells();

const cells = _$('.cell');
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        cell.classList.add('miss'); // hit/red or miss/blue
        cell.classList.add('no-click');
    });
});

function positionShip() {}

function listShips() {}

function rotateShip() {
    const ship = $('.dock > .ship');
    rotate.addEventListener('click', () => {
        ship.classList.toggle('config-vertical');
    });
}

rotateShip();

// const ships = [
//     { type: carrier, length: 5 },
//     { type: battleship, length: 4 },
//     { type: cruiser, length: 4 },
//     { type: submarine, length: 3 },
//     { type: destroyer, length: 2 },
// ];
