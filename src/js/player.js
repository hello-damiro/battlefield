/**
 * The function creates a player object with methods to attack a gameboard and randomly attack it.
 * @param gameboard - The gameboard parameter is an object that represents the game board where the
 * player will be attacking. It likely has a 2D array that represents the board's state, as well as
 * methods for placing ships and receiving attacks.
 * @returns An object with two methods: `attack` and `randomAttack`.
 */
export function Player(gameboard) {
    /**
     * The function "attack" calls the "receiveAttack" method of the "gameboard" object with the given
     * row and column parameters.
     * @param row - The row parameter is likely referring to a specific row on a game board. It is
     * being passed as an argument to the attack function.
     * @param col - The "col" parameter is a variable that represents the column index of a specific
     * cell on the gameboard. It is used as an argument for the "attack" function, which in turn calls
     * the "receiveAttack" method of the "gameboard" object, passing the "row" and "
     * @returns The `attack` function is returning the result of calling the `receiveAttack` method of
     * the `gameboard` object with the `row` and `col` arguments passed to the `attack` function. The
     * specific return value depends on the implementation of the `receiveAttack` method.
     */
    const attack = (row, col) => {
        return gameboard.receiveAttack(row, col);
    };

    /**
     * This function generates a random attack on a gameboard and ensures that the same spot is not
     * attacked twice.
     * @returns The function `randomAttack` is returning the result of calling the `receiveAttack`
     * method on the `gameboard` object with the randomly generated `row` and `col` values as
     * arguments.
     */
    const randomAttack = () => {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        while (gameboard.board[row][col] === 'miss') {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        }
        return gameboard.receiveAttack(row, col);
    };

    return {
        attack,
        randomAttack,
    };
}
