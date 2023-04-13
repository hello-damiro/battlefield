import Gameboard from './gameboard.js';
import Player from './player.js';

const gameLoop = () => {
    const player1Board = new Gameboard();
    const player2Board = new Gameboard();

    // Place player 1's ships
    player1Board.placeShip(3, [0, 0], 'horizontal');
    player1Board.placeShip(4, [2, 2], 'vertical');
    player1Board.placeShip(5, [5, 5], 'horizontal');

    // Place player 2's ships
    player2Board.placeShip(3, [1, 1], 'horizontal');
    player2Board.placeShip(4, [3, 3], 'vertical');
    player2Board.placeShip(5, [6, 6], 'horizontal');

    const player1 = new Player(player1Board, player2Board);
    const player2 = new Player(player2Board, player1Board);

    let gameOver = false;
    let currentPlayer = player1;

    const attackHandler = (event) => {
        const x = event.target.getAttribute('data-x');
        const y = event.target.getAttribute('data-y');
        if (!gameOver) {
            currentPlayer.attack([x, y]);
            if (currentPlayer.opponent.allShipsSunk()) {
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
        }
    };

    const renderBoards = () => {
        // Render player 1's board
        const player1BoardElement = document.getElementById('player1-board');
        player1BoardElement.innerHTML = '';
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-x', x);
                cell.setAttribute('data-y', y);
                if (player1Board.grid[x][y] === 'miss') {
                    cell.classList.add('miss');
                } else if (player1Board.grid[x][y] === 'hit') {
                    cell.classList.add('hit');
                }
                player1BoardElement.appendChild(cell);
            }
        }

        // Render player 2's board
        const player2BoardElement = document.getElementById('player2-board');
        player2BoardElement.innerHTML = '';
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-x', x);
                cell.setAttribute('data-y', y);
                if (player2Board.grid[x][y] === 'miss') {
                    cell.classList.add('miss');
                } else if (player2Board.grid[x][y] === 'hit') {
                    cell.classList.add('hit');
                }
                player2BoardElement.appendChild(cell);
            }
        }
    };

    // Render boards initially
    renderBoards();

    // Add click event listener to player 1's board
    const player1BoardElement = document.getElementById('player1-board');
    player1BoardElement.addEventListener('click', attackHandler);

    // Add click event listener to player 2's board
    const player2BoardElement = document.getElementById('player2-board');
    player2BoardElement.addEventListener('click', attackHandler);

    // Return a function to allow pausing the game loop
    const pauseGameLoop = () => {
        player1BoardElement.removeEventListener('click', attackHandler);
        player2BoardElement.removeEventListener('click', attackHandler);
    };

    return pauseGameLoop;
};
