import './styles/style.css';
import { $, _$ } from './js/helpers';
import { ships } from './js/constants';
import { Ship } from './js/ship';
import { createMap } from './js/ui/create-map';
import { playerSetUp } from './js/ui/player-setup';
import { events } from './js/pubsub';

const grid = 10;
const map = $('.main-map');
const miniMap = $('.monitor-map');

const enemyMap = createMap(map, grid, false);
const playerMap = createMap(miniMap, grid, true);
playerSetUp(ships);

function engageGame() {
    const cells = _$('.main-map .cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            cell.classList.add('empty');
        });
    });
}

events.on('cell-XY', printCellCoordinates);
function printCellCoordinates(xyCoord) {
    console.log('cell: ' + xyCoord.x + ', ' + xyCoord.y);
}

engageGame();
