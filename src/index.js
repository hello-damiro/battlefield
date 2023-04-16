import './styles/style.css';

import { $, _$ } from './js/helpers';
import { grid, ships } from './js/constants';
import { CreateMap } from './js/ui/create-map';
import { PlayerSetup } from './js/ui/setup-player';
import { AISetup } from './js/ui/setup-ai';
import { PlayGame } from './js/ui/play-game';
import { events } from './js/pubsub';

const mainMap = $('.main-map');
const miniMap = $('.monitor-map');

const disableMap = (disable) => (disable ? playerMap.disableCells() : '');
const printH3Text = (text) => ($('.configure-ship h3').textContent = text);
const printH4Text = (text) => ($('.configure-ship h4').textContent = text);
const printCellCoords = (xyCoord) => console.log('attacked cell: ' + xyCoord.x + ', ' + xyCoord.y);
const getAiSetup = (array) => console.log('AI: ' + array);
const getPlayerSetup = (array) => console.log('PL: ' + array);

events.on('ai-cells', getAiSetup);
events.on('player-cells', getPlayerSetup);
events.on('disable-map', disableMap);
events.on('text-h3', printH3Text);
events.on('text-h4', printH4Text);
events.on('cell-XY', printCellCoords);

const enemyMap = CreateMap(mainMap, grid, false);
const playerMap = CreateMap(miniMap, grid, true);

const ai = AISetup(mainMap, ships);
const player = PlayerSetup(miniMap, ships);

const game = PlayGame(mainMap);
