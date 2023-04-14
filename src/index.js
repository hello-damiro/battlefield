import './styles/style.css';
import { $, _$ } from './js/helpers';
import { ships } from './js/constants';
import { createMap } from './js/ui/create-map';
import { playerSetUp } from './js/ui/player-setup';

const grid = 10;
const map = $('.main-map');
const miniMap = $('.monitor-map');

const enemyMap = createMap(map, grid, false);
const playerMap = createMap(miniMap, grid, true);
playerSetUp(ships);

const startButton = $('.start');
startButton.addEventListener('click', () => {
    $('.main-map').classList.toggle('hidden');
    $('.dock-group').classList.toggle('hidden');
    $('.ship-lineup').classList.toggle('hidden');
    playerMap.disableCells(); // call if player setup is done
    // hide start button
});

function engageGame() {
    const cells = _$('.main-map .cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            cell.classList.add('empty');
        });
    });
}

engageGame();
