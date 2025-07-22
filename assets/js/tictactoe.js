let currentPlayer = "X";
let board = [];

function createBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      const btn = document.createElement("button");
      btn.classList.add("square");
      btn.dataset.row = i;
      btn.dataset.col = j;
      btn.addEventListener("click", () => chooseSquare(i, j));
      board[i][j] = btn;
      boardDiv.appendChild(btn);
    }
  }

  document.getElementById("message").textContent =
    "It is your turn, " + currentPlayer;
}

function chooseSquare(row, col) {
  const btn = board[row][col];
  btn.textContent = currentPlayer;
  btn.disabled = true;

  if (checkWin()) {
    document.getElementById("message").textContent = `${currentPlayer} wins!`;
    disableAll();
  } else if (movesTaken() === 9) {
    document.getElementById("message").textContent = "It's a draw";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("message").textContent =
      "It is your turn, " + currentPlayer;
  }
}

function checkWin() {
  const lines = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  return lines.some((line) => {
    const [a, b, c] = line;
    const t1 = board[a[0]][a[1]].textContent;
    const t2 = board[b[0]][b[1]].textContent;
    const t3 = board[c[0]][c[1]].textContent;
    return t1 && t1 === t2 && t2 === t3;
  });
}

function movesTaken() {
  return board
    .flat()
    .filter((btn) => btn.textContent === "X" || btn.textContent === "O").length;
}

function disableAll() {
  board.flat().forEach((btn) => (btn.disabled = true));
}

function resetBoard() {
  currentPlayer = "X";
  createBoard();
}

window.onload = createBoard;
