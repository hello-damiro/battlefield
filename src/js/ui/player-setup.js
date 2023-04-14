import { $, _$ } from '../helpers';

export const playerSetUp = (ships) => {
    let shipIndex = 0;
    let ship = ships[shipIndex];
    let rotate = false;

    function listShips() {
        const ul = $('.ship-lineup ul');
        ships.forEach((ship, index) => {
            const li = document.createElement('li');
            li.classList.add(ship.type);
            ul.appendChild(li);
            li.addEventListener('click', () => selectShip(index));
        });
    }

    function selectShip(index) {
        shipIndex = index;
        ship = ships[index];

        const shipOnDock = $('.ship > div');
        shipOnDock.setAttribute('class', '');
        shipOnDock.classList.add(ship.type);

        const shipH4 = $('.dock-name > h4');
        shipH4.textContent = ship.type;

        console.log(index + ': ' + rotate + ' ' + ship.type);
    }

    function rotateShip() {
        const ship = $('.dock > .ship');
        const rotateButton = $('.rotate');
        rotateButton.addEventListener('click', () => {
            ship.classList.toggle('config-vertical');
            rotate = !rotate;
        });
    }

    function positionShip() {
        const cells = _$('.cell');
        cells.forEach((cell) => {
            let set = false;
            const nucleus = cell.querySelector('.nucleus');
            cell.addEventListener('click', () => {
                set = true;
                cell.classList.add('no-click');
                cell.classList.add('empty');
                nucleus.classList.add(ship.type);
                if (rotate) nucleus.classList.add('vertical');
            });
            cell.addEventListener('mouseover', () => {
                nucleus.classList.add(ship.type);
                if (rotate) nucleus.classList.add('vertical');
            });
            cell.addEventListener('mouseout', () => {
                if (!set) {
                    nucleus.classList.remove(ship.type);
                    nucleus.classList.remove('vertical');
                }
            });
        });
    }

    rotateShip();
    listShips();
    selectShip(shipIndex);
    positionShip();
};
