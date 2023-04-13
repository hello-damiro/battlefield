import { Gameboard } from './gameboard';
import { Player } from './player';
import { Ship } from './ship';

describe('Player', () => {
    const board = new Gameboard();
    const player = new Player(board);

    it('attacks a cell', () => {
        expect(player.attack(0, 0)).toBe(false);
        expect(board.board[0][0]).toBe('miss');
    });

    it('attacks a random cell', () => {
        const randomAttackSpy = jest.spyOn(player, 'randomAttack');
        board.placeShip(new Ship(3), 2, 3, true);
        player.randomAttack();
        expect(randomAttackSpy).toHaveBeenCalled();
        expect(board.board.some((row) => row.includes(0))).toBe(true);
    });
});

/* This is a test suite for the `placeShip` method of the `Gameboard` class. It creates a new game
board and two ships of different lengths. Then, it tests two scenarios: one where the ship is placed
vertically and one where it is placed horizontally. The tests check if the method correctly places
the ship on the board and updates the `ships` array of the game board. */
describe('placeShip', () => {
    const board = new Gameboard();
    const ship = new Ship(3); // ship of length 3
    const ship2 = new Ship(5); // ship of length 5

    it('places a ship vertically', () => {
        board.placeShip(ship, 2, 3, true);

        expect(board.board[2][3]).toBe(0);
        expect(board.board[3][3]).toBe(0);
        expect(board.board[4][3]).toBe(0);
        expect(board.ships.length).toBe(1);
        expect(board.ships[0]).toBe(ship); // 1st ship
    });

    it('places a ship horizontally', () => {
        board.placeShip(ship2, 0, 0, false);

        expect(board.board[0][0]).toBe(1);
        expect(board.board[0][1]).toBe(1);
        expect(board.board[0][2]).toBe(1);
        expect(board.board[0][3]).toBe(1);
        expect(board.board[0][4]).toBe(1);
        expect(board.ships.length).toBe(2);
        expect(board.ships[1]).toBe(ship2); // 2nd ship
    });
});

/* This is a test suite for the `receiveAttack` method of the `Gameboard` class. It creates a new game
board and places a ship on it. Then, it tests two scenarios: one where the attack hits the ship and
one where it misses. The tests check if the method returns the correct value, if the ship's hit
count is updated correctly, and if the board is updated correctly with the hit or miss. */
describe('receiveAttack', () => {
    const board = new Gameboard();

    it('hits a ship', () => {
        const ship = new Ship(3);
        board.placeShip(ship, 2, 3, true);
        expect(board.receiveAttack(2, 3)).toBe(true);
        expect(ship.hits).toBe(1);
        expect(board.board[2][3]).toBe(0);
        expect(board.board[3][3]).toBe(0);
        expect(board.board[4][3]).toBe(0);
    });

    it('length 3 ship, hit 3x3', () => {
        const ship = new Ship(3);
        board.placeShip(ship, 2, 3, true);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    it('length 3 ship, hit 3x3', () => {
        const ship = new Ship(3);
        board.placeShip(ship, 2, 3, true);
        ship.hits = 3;
        expect(ship.isSunk()).toBe(true);
    });

    it('misses a ship', () => {
        const ship = new Ship(3);
        board.placeShip(ship, 2, 3, true);
        expect(board.receiveAttack(0, 0)).toBe(false);
        expect(board.board[0][0]).toBe('miss');
    });
});

describe('Player hitting a ship using randomAttack', () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    const player = new Player(board);

    beforeAll(() => {
        board.placeShip(ship, 2, 3, true);
    });

    test('player hits a ship using randomAttack', () => {
        const randomAttackSpy = jest.spyOn(player, 'randomAttack');
        player.randomAttack();
        expect(randomAttackSpy).toHaveBeenCalled();
        expect(ship.hits).toBe(0);
    });

    test('player sinks a ship using randomAttack', () => {
        const hitSpy = jest.spyOn(ship, 'hit');
        while (!ship.isSunk()) {
            player.randomAttack();
        }
        expect(hitSpy).toHaveBeenCalledTimes(3);
        expect(board.allSunk()).toBe(true);
    });
});

/* This is a test suite for the `allSunk` method of the `Gameboard` class. It creates a new game board
and places two ships on it. Then, it tests two scenarios: one where not all ships are sunk and one
where all ships are sunk. The tests check if the method returns the correct value in each scenario. */
describe('allSunk', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    board.placeShip(ship1, 2, 3, true);
    board.placeShip(ship2, 0, 0, false);

    it('returns false when not all ships are sunk', () => {
        ship2.hit();
        expect(board.allSunk()).toBe(false);
    });

    it('returns true when all ships are sunk', () => {
        ship1.hit();
        ship1.hit();
        ship1.hit();
        ship2.hit();
        expect(board.allSunk()).toBe(true);
    });
});
