const GRID_SIZE = 5;
let score = 0;
const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

const cells = [];

function createBoard() {
  for (let i = 0; i < GRID_SIZE; i++) {
    cells[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.row = i;
      div.dataset.col = j;
      div.dotty = false;

      div.addEventListener("click", () => destroyDot(i, j));
      board.appendChild(div);
      cells[i][j] = div;
    }
  }
}

function addDot() {
  let x, y;
  do {
    x = Math.floor(Math.random() * GRID_SIZE);
    y = Math.floor(Math.random() * GRID_SIZE);
  } while (cells[x][y].classList.contains("dot"));

  cells[x][y].classList.add("dot");
  cells[x][y].dotty = true;

  let speed = 1000;
  if (score > 30) speed = 200;
  else if (score > 20) speed = 400;
  else if (score > 10) speed = 500;

  const allRed = cells.flat().every(cell => cell.classList.contains("dot"));
  if (allRed) {
    scoreDisplay.textContent = "You lost! Score: " + score;
  } else {
    setTimeout(addDot, speed);
  }
}

function destroyDot(x, y) {
  const cell = cells[x][y];
  if (cell.classList.contains("dot")) {
    cell.classList.remove("dot");
    cell.dotty = false;
    score++;
    scoreDisplay.textContent = "Your score is " + score;
  }
}

window.onload = () => {
  createBoard();
  setTimeout(addDot, 1000);
};
