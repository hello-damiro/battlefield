import './styles/style.css';

import { $, _$, getTimer } from './js/helpers';
import { getRandomTo } from './js/helpers';
import { grid, ships } from './js/constants';
import { CreateMap } from './js/ui/create-map';
import { PlayerSetup } from './js/ui/setup-player';
import { AISetup } from './js/ui/setup-ai';
import { PlayGame } from './js/ui/play-game';
import { events } from './js/pubsub';
import { forEach } from 'lodash';

let aiNavy = [];
let playerNavy = [];

const mainMap = $('.main-map');
const miniMap = $('.monitor-map');

const enemyMap = CreateMap(mainMap, grid, false);
const playerMap = CreateMap(miniMap, grid, true);

const disableMap = (disable) => (disable ? playerMap.disableCells() : '');
events.on('disable-map', disableMap);
const printH3Text = (text) => ($('.configure-ship h3').textContent = text);
events.on('text-h3', printH3Text);
const printEmText = (text) => ($('.configure-ship em').textContent = text);
const getAiSetup = (navy) => (aiNavy = navy);
events.on('ai-navy', getAiSetup);
const getPlayerSetup = (navy) => (playerNavy = navy);
events.on('player-navy', getPlayerSetup);

const aiSetup = AISetup(mainMap, ships);
const playerSetup = PlayerSetup(miniMap, ships);
const player = PlayGame(mainMap);
const ai = PlayGame(miniMap);

aiSetup.revealAllShips();
player.enableCells();

function checkDamage(index) {
    const navyShip = aiNavy[index];
    navyShip.hit();
    if (navyShip.isSunk()) {
        printH3Text('Their ' + navyShip.type + ' has sunk!');
        printEmText('Good job Admiral!');
    }
}

function checkFleetSunk(navy) {
    let sunkShips = 0;
    navy.isSunk.forEach((element) => {});
    if (sunkShips == navy.length) {
        gameEnded();
    }
}

function gameEnded() {
    console.log('GAME OVER!');
}

async function attack(coords) {
    const attack = compareCoords(coords.x, coords.y, aiNavy);
    const isHit = attack.hit;
    const hitIndex = attack.index;
    const navyShip = aiNavy[hitIndex];
    const delay = 100;
    player.attacked(coords.x, coords.y, isHit);
    if (hitIndex != null) {
        printH3Text('Nice shot!');
        await getTimer(1000);
        checkDamage(hitIndex);
    }

    await getTimer(delay);
    const enemyAttackCell = takeRandomAttack();
    retaliate(enemyAttackCell);
}

events.on('player-attacks-xy', attack);

let playerCells = [];
generatePlayerCells();

function generatePlayerCells() {
    for (let x = 1; x <= grid; x++) {
        for (let y = 1; y <= grid; y++) {
            playerCells.push({ x, y });
        }
    }
}

function takeRandomAttack() {
    const index = getRandomTo(playerCells.length);
    const cell = playerCells[index];
    playerCells.splice(index, 1);
    console.log(cell);
    return cell;
}

function retaliate(coords) {
    // console.log('AI RS: ' + coords.x + '/' + coords.y);
    const attack = compareCoords(coords.x, coords.y, playerNavy);
    const isHit = attack.hit;
    const hitIndex = attack.index;
    ai.attacked(attack.x, attack.y, isHit);
    if (hitIndex != null) {
        printH3Text('Our ' + playerNavy[hitIndex].type + ' has been hit!');
        printEmText('Careful!!!');
    }
}

function compareCoords(x, y, navy) {
    let hit = false;
    let index = null;
    for (let i = 0; i < navy.length; i++) {
        const ship = navy[i];
        for (let j = 0; j < ship.cells.length; j++) {
            const cell = ship.cells[j];
            const xyStr = x + ',' + y;
            const cellStr = cell.toString();
            if (xyStr === cellStr) {
                hit = true;
                index = i;
                break;
            }
        }
        if (hit) break;
    }
    return {
        x: x,
        y: y,
        hit: hit,
        index: index,
    };
}

function randomCoords() {
    return {
        x: getRandomTo(grid),
        y: getRandomTo(grid),
    };
}
