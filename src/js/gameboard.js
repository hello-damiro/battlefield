export class Gameboard {
    constructor() {
        /* This line of code is creating a 2D array with 10 rows and 10 columns, where each element is
        initialized to null. It is using the `Array.from()` method to create the array and the arrow
        function `() => null` to initialize each element to null. 
        
        eq: Array[[Array[10]], [[Array[10]], ..., [[Array[10]]]
        */
        this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => null));
        this.ships = [];
    }

    /**
     * This function places a ship on a game board either vertically or horizontally.
     * @param ship - The ship object that needs to be placed on the game board.
     * @param row - The row where the ship will be placed on the game board.
     * @param col - The "col" parameter represents the starting column index where the ship will be
     * placed on the game board.
     * @param isVertical - A boolean value indicating whether the ship should be placed vertically
     * (true) or horizontally (false) on the game board.
     */
    placeShip(ship, row, col, isVertical) {
        if (isVertical) {
            for (let i = row; i < row + ship.length; i++) {
                this.board[i][col] = this.ships.length;
            }
        } else {
            for (let i = col; i < col + ship.length; i++) {
                this.board[row][i] = this.ships.length;
            }
        }
        this.ships.push(ship);
    }

    /**
     * The function receives a row and column as input, checks if there is a ship at that location on
     * the board, and either marks it as a hit or a miss.
     * @param row - The row index of the cell being attacked on the game board.
     * @param col - The column index of the cell where the attack is being made on the game board.
     * @returns a boolean value. If the board position at the given row and column contains a ship, the
     * function returns true after marking the ship as hit. If the board position is empty, the
     * function marks it as a miss and returns false.
     */
    receiveAttack(row, col) {
        if (this.board[row][col] !== null) {
            const ship = this.ships[this.board[row][col]];
            ship.hit();
            return true;
        }
        this.board[row][col] = 'miss';
        return false;
    }

    /**
     * The function checks if all ships in a game have been sunk.
     * @returns The `allSunk()` function is returning a boolean value. It returns `true` if every ship
     * in the `ships` array is sunk (i.e., `isSunk()` returns `true` for every ship), and `false`
     * otherwise.
     */
    allSunk() {
        return this.ships.every((ship) => ship.isSunk());
    }
}
