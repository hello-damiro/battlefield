import { $, _$ } from '../helpers';
import { events } from '../pubsub';
import { randomBool } from '../helpers'

export const PlayGame = (map) => {
    function enableCell() {
        const cells = map.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            cell.addEventListener('click', () => attackEnamy(x, y, randomBool()));
        });
    }

    function attackEnamy(x, y, isHit) {
        const cell = map.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add('no-click');
        if (isHit) cell.classList.add('hit');
        else cell.classList.add('miss');
        events.emit('cell-XY', { x: x, y: y });
    }

    enableCell();

    return {
        attackEnamy: attackEnamy,
    };
};
