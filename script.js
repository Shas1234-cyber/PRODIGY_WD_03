document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('statusMessage');
    const restartBtn = document.getElementById('restartBtn');
    const vsHumanBtn = document.getElementById('vsHumanBtn');
    const vsAiBtn = document.getElementById('vsAiBtn');

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = false;
    let mode = "";
    let scoreX = 0;
    let scoreO = 0;

    const scoreDisplayX = document.getElementById('scoreX');
    const scoreDisplayO = document.getElementById('scoreO');

    const winningPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    vsHumanBtn.addEventListener('click', () => startGame('human'));
    vsAiBtn.addEventListener('click', () => startGame('ai'));
    restartBtn.addEventListener('click', resetGame);

    function startGame(selectedMode) {
        mode = selectedMode;
        resetBoard();
        gameActive = true;
        currentPlayer = "X";
        statusMessage.textContent = `${mode === 'ai' ? 'Your' : "Player X's"} Turn!`;
    }

    function handleCellClick() {
        const index = this.getAttribute('data-index');
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        this.textContent = currentPlayer;

        if (checkWinner(currentPlayer)) {
            updateScore(currentPlayer);
            statusMessage.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== "")) {
            statusMessage.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        if (mode === 'human') {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusMessage.textContent = `Player ${currentPlayer}'s Turn!`;
        } else if (mode === 'ai') {
            currentPlayer = "O";
            statusMessage.textContent = "AI's Turn...";
            setTimeout(aiMove, 500);
        }
    }

    function aiMove() {
        if (!gameActive) return;

        let availableCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

        board[randomIndex] = "O";
        cells[randomIndex].textContent = "O";

        if (checkWinner("O")) {
            updateScore("O");
            statusMessage.textContent = "AI Wins!";
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== "")) {
            statusMessage.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = "X";
        statusMessage.textContent = "Your Turn!";
    }

    function checkWinner(player) {
        return winningPatterns.some(pattern =>
            pattern.every(index => board[index] === player)
        );
    }

    function updateScore(winner) {
        if (winner === "X") {
            scoreX++;
            scoreDisplayX.textContent = scoreX;
        } else {
            scoreO++;
            scoreDisplayO.textContent = scoreO;
        }
    }

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
    }

    function resetGame() {
        resetBoard();
        gameActive = false;
        mode = "";
        statusMessage.textContent = "Select Mode to Start!";
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});


