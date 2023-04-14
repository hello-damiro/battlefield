import './styles/style.css';
import { $, _$ } from './js/helpers';
import { ships } from './js/constants';
import { createMap } from './js/ui/create-map';
import { playerSetUp } from './js/ui/player-setup';

const grid = 10;
const map = $('.main-map');
const miniMap = $('.monitor-map');

createMap(map, grid);
createMap(miniMap, grid, true).disableCells();
playerSetUp(ships);
