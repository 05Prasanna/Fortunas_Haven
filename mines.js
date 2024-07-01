const GRID_SIZE = 10; // Adjust grid size as needed
const NUM_MINES = 10; // Adjust number of mines as needed

let grid = [];
let gameOver = false;

function startGame() {
  gameOver = false;
  grid = createGrid(GRID_SIZE);
  placeMines(grid, NUM_MINES);
  updateGridDisplay(grid);
  document.getElementById('message').innerText = '';
}

function createGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        isMine: false,
        revealed: false,
        value: 0
      });
    }
    grid.push(row);
  }
  return grid;
}

function placeMines(grid, numMines) {
  let count = 0;
  while (count < numMines) {
    let row = Math.floor(Math.random() * GRID_SIZE);
    let col = Math.floor(Math.random() * GRID_SIZE);
    if (!grid[row][col].isMine) {
      grid[row][col].isMine = true;
      count++;
    }
  }
}

function updateGridDisplay(grid) {
  const gridElement = document.getElementById('grid');
  gridElement.innerHTML = '';

  grid.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      let tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      if (tile.revealed) {
        if (tile.isMine) {
          tileElement.textContent = '*'; // Display mine
          tileElement.style.backgroundColor = 'red';
        } else {
          tileElement.textContent = tile.value || ''; // Display number of adjacent mines
        }
      } else {
        tileElement.addEventListener('click', () => revealTile(rowIndex, colIndex));
      }
      gridElement.appendChild(tileElement);
    });
  });
}

function revealTile(row, col) {
  if (gameOver || grid[row][col].revealed) return;

  grid[row][col].revealed = true;

  if (grid[row][col].isMine) {
    gameOver = true;
    revealAllMines();
    document.getElementById('message').innerText = 'Game Over! You hit a mine.';
  } else {
    grid[row][col].value = countAdjacentMines(row, col);
    updateGridDisplay(grid);
    checkWin();
  }
}

function countAdjacentMines(row, col) {
  let count = 0;
  for (let i = Math.max(0, row - 1); i <= Math.min(GRID_SIZE - 1, row + 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(GRID_SIZE - 1, col + 1); j++) {
      if (grid[i][j].isMine) {
        count++;
      }
    }
  }
  return count;
}

function revealAllMines() {
  grid.forEach(row => {
    row.forEach(tile => {
      if (tile.isMine) tile.revealed = true;
    });
  });
  updateGridDisplay(grid);
}

function checkWin() {
  let unrevealedTiles = 0;
  grid.forEach(row => {
    row.forEach(tile => {
      if (!tile.revealed && !tile.isMine) {
        unrevealedTiles++;
      }
    });
  });
  if (unrevealedTiles === 0) {
    gameOver = true;
    document.getElementById('message').innerText = 'Congratulations! You won!';
  }
}
