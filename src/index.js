import './styles/style.css';

import { $, _$, getTimer } from './js/helpers';
import { getRandomTo } from './js/helpers';
import { grid, ships } from './js/constants';
import { CreateMap } from './js/ui/create-map';
import { PlayerSetup } from './js/ui/setup-player';
import { AISetup } from './js/ui/setup-ai';
import { PlayGame } from './js/ui/play-game';
import { events } from './js/pubsub';

let odinToggle = true;
const delay = 800;

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

player.enableCells();

$('.odin').addEventListener('click', () => toggleShowShips(aiSetup));

function checkDamage(index) {
    const navyShip = aiNavy[index];
    navyShip.hit();
    if (navyShip.isSunk()) {
        printH3Text('Their ' + navyShip.type + ' has sunk!');
        printEmText('Good job Admiral!');
    }
}

function checkFleetSunk(navy) {
    disableUI(false);
    let sunkShips = 0;
    navy.forEach((ship) => {
        if (ship.isSunk()) sunkShips++;
    });
    if (sunkShips == navy.length) gameEnded();
}

async function gameEnded() {
    disableUI(true);
    await getTimer(delay * 3);
    printH3Text('You won!');
    printEmText('Nice work Admiral! Now go back and study the code.');
    odinToggle = false;
    toggleShowShips(aiSetup);
}

async function attack(coords) {
    printH3Text('');
    printEmText('');
    disableUI(true);
    await getTimer(delay);
    const enemyAttackCell = takeRandomAttack();
    retaliate(enemyAttackCell);

    const attack = compareCoords(coords.x, coords.y, aiNavy);
    const isHit = attack.hit;
    const hitIndex = attack.index;

    player.attacked(coords.x, coords.y, isHit);
    if (hitIndex != null) {
        printH3Text('Nice shot!');
        checkDamage(hitIndex);
        await getTimer(delay);
        checkFleetSunk(aiNavy);
    } else {
        disableUI(false);
    }
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

function retaliate(coords) {
    const attack = compareCoords(coords.x, coords.y, playerNavy);
    const isHit = attack.hit;
    const hitIndex = attack.index;
    ai.attacked(attack.x, attack.y, isHit);
    if (hitIndex != null) {
        printH3Text('Our ' + playerNavy[hitIndex].type + ' has been hit!');
        printEmText('Careful!!!');
    }
}

function takeRandomAttack() {
    const index = getRandomTo(playerCells.length);
    const cell = playerCells[index];
    playerCells.splice(index, 1);
    return cell;
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

function disableUI(disable) {
    if (disable) $('.curtain').classList.remove('hidden');
    else $('.curtain').classList.add('hidden');
}

function toggleShowShips(setup) {
    odinToggle = !odinToggle;
    setup.revealAllShips(odinToggle);
}
