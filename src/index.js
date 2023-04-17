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
const getAiSetup = (navy) => (aiNavy = navy);
const getPlayerSetup = (navy) => (playerNavy = navy);

events.on('ai-navy', getAiSetup);
events.on('player-navy', getPlayerSetup);
events.on('disable-map', disableMap);
events.on('text-h3', printH3Text);
events.on('text-h4', printH4Text);

const aiSetup = AISetup(mainMap, ships);
const playerSetup = PlayerSetup(miniMap, ships);

const player = PlayGame(mainMap);
const ai = PlayGame(miniMap);
player.enableCells();

function attack(coords) {
    const isHit = compareCoords(coords.x, coords.y, aiNavy);
    player.attacked(coords.x, coords.y, isHit);
    // console.log('attacked cell: ' + coords.x + ', ' + coords.y);
}
events.on('player-attacks-xy', attack);

function retaliate(coords) {
    console.log('retaliated cell: ' + coords.x + ', ' + coords.y);
}

function compareCoords(x, y, navy) {
    let hit = false;
    navy.forEach((ship) => {
        ship.cells.forEach((cell, index) => {
            const xyStr = x + ',' + y;
            const cellStr = cell.toString();
            if (xyStr === cellStr) {
                hit = true;
                return hit;
            }
        });
    });
    return hit;
}

// Sample usage below:

ai.attacked(1, 1, false);
// aiSetup.revealShip(0);
aiSetup.revealAllShips();
player.attacked(10, 10);

console.log('AI Navy: ' + aiNavy[0].type);
console.log('AI Navy: ' + aiNavy[0].cells);
aiNavy[0].hits = 3;
aiNavy[0].hit();
aiNavy[0].hit();
console.log('AI Navy: ' + aiNavy[0].hits);
console.log('AI Navy: ' + aiNavy[0].isSunk());
