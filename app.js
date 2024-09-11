// Selecting HTML Elements
const board = document.getElementById("game-board");
const messageElement = document.getElementById("message");

// Game States
let currentPlayer = "X";
let gameBoard = Array(9).fill(""); // Initially 9 empty cells
let isGameActive = true;

// Creating the Game Board
function createGameBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Handling Click Event on Cell
function handleCellClick(event) {
    const clickedIndex = event.target.getAttribute("data-index");

    // If the selected cell is empty and the game is active
    if (gameBoard[clickedIndex] === "" && isGameActive) {
        updateGameBoard(clickedIndex);
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            displayMessage(`${currentPlayer} wins!`);
            isGameActive = false;
        } else if (isBoardFull()) {
            displayMessage("It's a draw!");
            isGameActive = false;
        } else {
            switchPlayer();
        }
    }
}

// Updating the Game Board
function updateGameBoard(index) {
    gameBoard[index] = currentPlayer;
}

// Checking for Win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winConditions.some((condition) => {
        const [a, b, c] = condition; // Destructure the winning conditions
        return (
            gameBoard[a] !== "" &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[b] === gameBoard[c] 
        );
    });
}

// Checking if the Board is Full
function isBoardFull() {
    return gameBoard.every((cell) => cell !== "");
}

// Switching the Current Player
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Displaying a Message
function displayMessage(msg) {
    messageElement.textContent = msg;
}

// Create the Game Board
createGameBoard();