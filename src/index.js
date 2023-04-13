import './styles/style.css';
import { $, _$ } from './js/helpers';
import { createMap } from './js/create-map';

const map = $('.main-map');
const miniMap = $('.monitor-map');
const shipsLineup = $('.ship-lineup ul');
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

// const ships = [
//     { type: carrier, space: 5 },
//     { type: battleship, space: 4 },
//     { type: cruiser, space: 4 },
//     { type: submarine, space: 3 },
//     { type: destroyer, space: 2 },
// ];
