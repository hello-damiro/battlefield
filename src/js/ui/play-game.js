import { $, _$ } from '../helpers';
import { events } from '../pubsub';
import { getRandomBool } from '../helpers';

export const PlayGame = (map) => {
    function enableCells() {
        const cells = map.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            cell.addEventListener('click', () => attacked(x, y, getRandomBool()));
        });
    }

    function attacked(x, y) {
        const cell = map.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add('no-click');

        const isHit = hits(x, y);
        if (isHit) cell.classList.add('hit');
        else cell.classList.add('miss');
        events.emit('cell-XY', { x: x, y: y });
    }

    function hits(x, y) {
        return false;
    }

    return {
        attacked: attacked,
    };
};
