import './styles/style.css';
import { $, _$ } from './js/helpers';
import { ships } from './js/constants';
import { CreateMap } from './js/ui/create-map';
import { PlayerSetup } from './js/ui/setup-player';
import { AISetup } from './js/ui/setup-ai';
import { PlayGame } from './js/ui/play-game';
import { events } from './js/pubsub';

export const grid = 10;
const mainMap = $('.main-map');
const miniMap = $('.monitor-map');

const disableMap = (disable) => (disable ? playerMap.disableCells() : '');
events.on('disable-map', disableMap);

const printH3Text = (text) => ($('.configure-ship h3').textContent = text);
events.on('text-h3', printH3Text);

const printH4Text = (text) => ($('.configure-ship h4').textContent = text);
events.on('text-h4', printH4Text);

const printCellCoords = (xyCoord) => console.log('attacked cell: ' + xyCoord.x + ', ' + xyCoord.y);
events.on('cell-XY', printCellCoords);

const enemyMap = CreateMap(mainMap, grid, false);
const playerMap = CreateMap(miniMap, grid, true);
// const game = PlayGame(mainMap);

const ai = AISetup(mainMap, ships);
const player = PlayerSetup(miniMap, ships);

ai.placeShips();
