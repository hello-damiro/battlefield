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

events.on('disableMap', disableMap);
function disableMap(disable) {
    if (disable) playerMap.disableCells();
}

events.on('cell-XY', printCellCoordinates);
function printCellCoordinates(xyCoord) {
    console.log('cell: ' + xyCoord.x + ', ' + xyCoord.y);
}

events.on('text-h3', printH3Text);
function printH3Text(text) {
    const textH3 = $('.configure-ship h3');
    textH3.textContent = text;
}
