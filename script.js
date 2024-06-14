const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            gameActive = false;
            message.innerText = '';
            modalMessage.innerText = `${currentPlayer} wins!`;
            modal.style.display = 'block';
            return;
        }
    }
    if ([...cells].every(cell => cell.innerText)) {
        gameActive = false;
        message.innerText = '';
        modalMessage.innerText = "It's a draw!";
        modal.style.display = 'block';
    }
};

const handleClick = (e) => {
    const cell = e.target;
    const index = [...cells].indexOf(cell);
    if (!gameActive || cell.innerText) return;
    cell.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;
};

const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    message.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
    modal.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);
