// variables
let playerRed = "red";
let playerYellow = "yellow";
let playAgainstPC = false;
let currentPlayer = playerYellow;

let gameOver = false;
let board = [];

let rows = 6;
let cols = 7;

// Selectors
const startGame = document.querySelector(".start-button");
const turnTile = document.querySelector(".turnTile");
const winnerTile = document.querySelector(".winnerTile");
const PCMode = document.querySelector(".pc-button");
const twoPlayersMode = document.querySelector(".two-players-button");

// Event listeners

window.onload = function () {
  setGame();
};

PCMode.addEventListener("click", function () {
  if (board.some((b) => b.some((a) => a !== " "))) return;
  playAgainstPC = true;
  PCMode.style.backgroundColor = "red";
  twoPlayersMode.style.backgroundColor = "grey";
});

twoPlayersMode.addEventListener("click", function () {
  if (board.some((b) => b.some((a) => a !== " "))) return;
  playAgainstPC = false;
  PCMode.style.backgroundColor = "grey";
  twoPlayersMode.style.backgroundColor = "red";
});

startGame.addEventListener("click", function () {
  gameOver = false;
  board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(" ");
    }
    board.push(row);
  }

  winnerTile.classList.remove(playerRed);
  winnerTile.classList.remove(playerYellow);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      document.getElementById(i + "-" + j).classList.remove(playerRed);
      document.getElementById(i + "-" + j).classList.remove(playerYellow);
    }
  }

  winnerTile.innerHTML = " ";
});

// Functions
function setTurnPiece() {
  turnTile.classList.remove(currentPlayer);
  if (currentPlayer === playerRed) {
    currentPlayer = playerYellow;
  } else {
    currentPlayer = playerRed;
  }
  turnTile.classList.add(currentPlayer);
}

function setGame() {
  board = [];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(" ");

      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setTile);
      tile.addEventListener("mouseover", setTopTile);
      tile.addEventListener("mouseout", cleanTopTile);
      document.querySelector(".board").append(tile);
    }
    board.push(row);
  }
}

function setTopTile() {
  if (gameOver !== true) {
    document.getElementById(this.id.split("-")[1]).style.backgroundColor =
      currentPlayer;
  }
}

function cleanTopTile() {
  document.getElementById(this.id.split("-")[1]).style.backgroundColor = null;
}

function setTile() {
  if (gameOver) return;

  let position = this.id;
  position = position.split("-");
  r = position[0];
  c = position[1];

  if (board[0][c] !== " ") return;

  for (let i = rows - 1; i >= 0; i--) {
    if (board[i][c] === " ") {
      document.getElementById(i + "-" + c).classList.add(currentPlayer);
      board[i][c] = currentPlayer;
      break;
    }
  }

  checkWinner(currentPlayer);
  checkFullBoard();
  setTurnPiece();
  if (playAgainstPC && !gameOver) PCMoveTile();

  document.getElementById(this.id.split("-")[1]).style.backgroundColor =
    currentPlayer;
}

function checkFullBoard() {
  if (board.every((a) => a.every((b) => b !== " "))) {
    winnerTile.innerHTML = "TIE!";
    gameOver = true;
    console.log("tie");
  }
}

function PCMoveTile() {
  let delayTime = Math.floor(Math.random() * 500) + 400;

  setTimeout(() => {
    // Little delay on PC turn to improve user experience
    let PCColumSelection;
    do {
      PCColumSelection = Math.floor(Math.random() * cols);
    } while (board[0][PCColumSelection] !== " ");

    for (let i = rows - 1; i >= 0; i--) {
      if (board[i][PCColumSelection] === " ") {
        document
          .getElementById(i + "-" + PCColumSelection)
          .classList.add(currentPlayer);
        board[i][PCColumSelection] = currentPlayer;
        break;
      }
    }
    checkWinner(currentPlayer);
    setTurnPiece();
  }, delayTime);
}

function checkWinner(player) {
  //check vertically
  for (let j = 0; j < cols; j++) {
    for (let i = rows - 1; i >= 3; i--) {
      if (
        board[i][j] === player &&
        board[i - 1][j] === player &&
        board[i - 2][j] === player &&
        board[i - 3][j] === player
      ) {
        console.log(`${currentPlayer} wins!!!`);
        winnerTile.classList.add(currentPlayer);
        gameOver = true;
        return;
      }
    }
  }
  //check horizontally
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j <= cols - 3; j++) {
      if (
        board[i][j] === player &&
        board[i][j + 1] === player &&
        board[i][j + 2] === player &&
        board[i][j + 3] === player
      ) {
        console.log(`${currentPlayer} wins!!!`);
        gameOver = true;
        winnerTile.classList.add(currentPlayer);
        turnTile.classList.remove(currentPlayer);
        return;
      }
    }
  }

  //check diagonally /
  for (let i = 0; i < rows - 3; i++) {
    for (let j = 0; j <= cols - 3; j++) {
      if (
        board[i][j] === player &&
        board[i + 1][j + 1] === player &&
        board[i + 2][j + 2] === player &&
        board[i + 3][j + 3] === player
      ) {
        console.log(`${currentPlayer} wins!!!`);
        gameOver = true;
        winnerTile.classList.add(currentPlayer);
        turnTile.classList.remove(currentPlayer);
        return;
      }
    }
  }

  //check diagonally \
  for (let i = 0; i < rows - 3; i++) {
    for (let j = cols - 1; j >= 3; j--) {
      if (
        board[i][j] === player &&
        board[i + 1][j - 1] === player &&
        board[i + 2][j - 2] === player &&
        board[i + 3][j - 3] === player
      ) {
        console.log(`${currentPlayer} wins!!!`);
        gameOver = true;
        winnerTile.classList.add(currentPlayer);
        turnTile.classList.remove(currentPlayer);
        return;
      }
    }
  }
}

turnTile.classList.add(currentPlayer);
