import './styles/style.css';

import { $, _$ } from './js/helpers';
import { grid, ships } from './js/constants';
import { CreateMap } from './js/ui/create-map';
import { PlayerSetup } from './js/ui/setup-player';
import { AISetup } from './js/ui/setup-ai';
import { PlayGame } from './js/ui/play-game';
import { events } from './js/pubsub';

let aiNavy = [];
let playerNavy = [];

const mainMap = $('.main-map');
const miniMap = $('.monitor-map');

const enemyMap = CreateMap(mainMap, grid, false);
const playerMap = CreateMap(miniMap, grid, true);

const disableMap = (disable) => (disable ? playerMap.disableCells() : '');
const printH3Text = (text) => ($('.configure-ship h3').textContent = text);
const printH4Text = (text) => ($('.configure-ship h4').textContent = text);
const printCellCoords = (xyCoord) => console.log('attacked cell: ' + xyCoord.x + ', ' + xyCoord.y);
const getAiSetup = (navy) => (aiNavy = navy);
const getPlayerSetup = (navy) => (playerNavy = navy);

events.on('ai-navy', getAiSetup);
events.on('player-navy', getPlayerSetup);
events.on('disable-map', disableMap);
events.on('text-h3', printH3Text);
events.on('text-h4', printH4Text);
events.on('cell-XY', printCellCoords);

const aiSetup = AISetup(mainMap, ships);
const playerSetup = PlayerSetup(miniMap, ships);

const player = PlayGame(mainMap);
const ai = PlayGame(miniMap);

// Sample usage below:

ai.attacked(1, 1);
player.attacked(10, 10);

console.log('AI Navy: ' + aiNavy[0].type);
console.log('AI Navy: ' + aiNavy[0].cells);
aiNavy[0].hits = 3;
aiNavy[0].hit();
aiNavy[0].hit();
console.log('AI Navy: ' + aiNavy[0].hits);
console.log('AI Navy: ' + aiNavy[0].isSunk());

function compareCoords() {}
