import './styles/style.css';
import { $, _$ } from './js/helpers';
import { ships } from './js/constants';
import { CreateMap } from './js/ui/create-map';
import { SetupGame } from './js/ui/setup-game';
import { PlayGame } from './js/ui/play-game';
import { events } from './js/pubsub';

const grid = 10;
const mainMap = $('.main-map');
const miniMap = $('.monitor-map');

const enemyMap = CreateMap(mainMap, grid, false);
const playerMap = CreateMap(miniMap, grid, true);

const setup = SetupGame(miniMap, ships);
const game = PlayGame(mainMap);

const disableMap = (disable) => (disable ? playerMap.disableCells() : '');
events.on('disable-map', disableMap);

const printH3Text = (text) => ($('.configure-ship h3').textContent = text);
events.on('text-h3', printH3Text);

const printCellCoords = (xyCoord) => console.log('attacked cell: ' + xyCoord.x + ', ' + xyCoord.y);
events.on('cell-XY', printCellCoords);
