let COLS = 3;
let ROWS = 3;
let board = [];

const totalWidth = 600;
const totalHeight = totalWidth;
let available = COLS * ROWS;
let possibilties = 0;
let cumulPossibility = possibilties;

function setup() {
  const canvas = createCanvas(totalWidth, totalHeight);
  canvas.parent("canvas-container");

  class Cell {
    constructor() {
      this.value = "";
    }
  }

  for (let currCol = 0; currCol < COLS; currCol++) {
    let row = [];
    for (let i = 0; i < ROWS; i++) {
      row.push(new Cell());
    }
    board.push(row);
  }
}

function draw() {
  background(17, 17, 27);
  strokeWeight(4);

  let cellHeight = totalHeight / ROWS;
  let cellWidth = totalWidth / COLS;

  // The grid
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      let cellX = col * cellWidth;
      let cellY = row * cellHeight;
      const PADDING = 40;
      fill(30, 30, 46);
      stroke(88, 91, 112);
      rect(cellX, cellY, cellWidth, cellHeight);
      // Draw the X's or the O's
      switch (board[col][row].value) {
        case "X":
          stroke(243, 139, 168);
          line(
            cellX + PADDING,
            cellY + PADDING,
            cellX + cellWidth - PADDING,
            cellY + cellHeight - PADDING
          );
          line(
            cellX + cellWidth - PADDING,
            cellY + PADDING,
            cellX + PADDING,
            cellY + cellHeight - PADDING
          );
          break;
        case "O":
          stroke(250, 179, 135);
          ellipse(
            cellX + cellWidth / 2,
            cellY + cellHeight / 2,
            cellWidth - 2 * PADDING
          );
        default:
          break;
      }
    }
  }
}

function IsEqual(a, b, c) {
  return a.value == b.value && b.value == c.value && a.value != "";
}
// Parts of the code inspired by this video: https://www.youtube.com/watch?v=trKjYdBASyQ&t=73s
function checkWinner() {
  let winner = null;
  function IsEqual(a, b, c) {
    return a.value == b.value && b.value == c.value && a.value != "";
  }
  // horizontal
  for (let i = 0; i < COLS; i++) {
    if (IsEqual(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0].value;
    }
  }

  // Vertical
  for (let i = 0; i < ROWS; i++) {
    if (IsEqual(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i].value;
    }
  }

  // Diagonal
  if (IsEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0].value;
  }
  if (IsEqual(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0].value;
  }

  if (winner == null && available == 0) return "tie";
  else return winner;
}

function minimax(depth, isItHuman) {
  let result = checkWinner();

  if (result != null) {
    switch (result) {
      case "tie":
        return 0;
      case "X":
        return -1;
      case "O":
        return 1;
    }
  }

  if (isItHuman) {
    // will try to minimize
    let bestScore = Infinity;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let score;
        if (board[col][row].value == "") {
          possibilties++;
          board[col][row].value = "X"; // the human ticker
          score = minimax(depth + 1, false);
          board[col][row].value = "";
          bestScore = min(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    // will try to maximize
    let bestScore = -Infinity;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let score;
        if (board[col][row].value == "") {
          possibilties++;
          board[col][row].value = "O"; // the human ticker
          score = minimax(depth + 1, true);
          board[col][row].value = "";
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function mouseClicked() {
  document.getElementById("begin").style.display = "none";
  document.getElementById("message").style.display = "block";
  let cellHeight = totalHeight / ROWS;
  let cellWidth = totalWidth / COLS;
  let selected = board[int(mouseX / cellWidth)][int(mouseY / cellHeight)].value;
  if (selected.length == "") {
    board[int(mouseX / cellWidth)][int(mouseY / cellHeight)].value = "X";
    available--;
  }

  setTimeout(() => {
    // AI plays
    let bestScore = -Infinity;
    let move;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let score;
        if (board[col][row].value == "") {
          board[col][row].value = "O";
          // this is the root so the depth is 0
          score = minimax(0, false); // the next move is by AI
          board[col][row].value = "";
        }
        // we're maxxing
        if (score > bestScore) {
          bestScore = score;
          move = { col, row };
        }
      }
    }

    board[move.col][move.row].value = "O";
    available--;

    // Show stats
    document.getElementById("bignumber").textContent = possibilties;
    cumulPossibility += possibilties;
    document.getElementById("smallnumber").textContent = cumulPossibility;
    possibilties = 0;

    // Check for ties or wins
    let winner = checkWinner();

    if (winner != null) {
      switch (winner) {
        case "tie":
          document.getElementById("winner").innerHTML =
            "Tie!!! 👔<br>Are you an AI by any chance?";
          break;
        case "X":
          document.getElementById("winner").innerHTML =
            "Rejoice! You just beat the AI 🎊 <br>You're safe from AI doom (for now)";
          break;
        case "O":
          document.getElementById("winner").innerHTML =
            "Alas! You've lost to the AI 😥 <br>A step closer to AI doom...";
          break;
        default:
          break;
      }
    }
  }, 200);
}
