import './styles/style.css';
import { $, _$ } from './js/helpers';
import { createMap } from './js/create-map';

const map = $('.main-map');
const miniMap = $('.monitor-map');
const grid = 10;

createMap(map, grid);
createMap(miniMap, grid, true).disableCells();

const cells = _$('.cell');
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        cell.classList.add('hit');
        cell.classList.add('no-click');
    });
});
