const board = document.getElementById('board');
        const message = document.getElementById('message');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function initializeBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', () => handleCellClick(i));
                board.appendChild(cell);
            }
        }

        function handleCellClick(index) {
            if (!gameActive || gameBoard[index] !== '') return;

            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                message.innerText = `Player 1 wins!`;
                gameActive = false;
            } else if (isBoardFull()) {
                message.innerText = 'Player 1 wins!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.innerText = `Player ${currentPlayer}'s turn`;
            }
        }

        function renderBoard() {
            gameBoard.forEach((mark, index) => {
                const cell = board.children[index];
                cell.innerText = mark;
            });
        }

        function checkWinner() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                [0, 4, 8], [2, 4, 6]             
            ];

            return winningCombos.some(combo => {
                const [a, b, c] = combo;
                return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        function isBoardFull() {
            return gameBoard.every(cell => cell !== '');
        }

        initializeBoard();
        message.innerText = `Player ${currentPlayer}'s turn`;
