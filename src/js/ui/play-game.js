import { $, _$ } from '../helpers';
import { events } from '../pubsub';
import { getRandomBool } from '../helpers';

export const PlayGame = (map) => {
    function enableCells() {
        const cells = map.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const x = cell.getAttribute('data-x');
            const y = cell.getAttribute('data-y');
            cell.addEventListener('click', () => events.emit('player-attacks-xy', { x: x, y: y }));
        });
    }

    function attacked(x, y, isHit) {
        const cell = map.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add('no-click');
        if (isHit == true) cell.classList.add('hit');
        else cell.classList.add('miss');
    }

    return {
        enableCells: enableCells,
        attacked: attacked,
    };
};
