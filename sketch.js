let COLS = 3;
let ROWS = 3;
let board = [];

function setup() {
  createCanvas(windowWidth / 2, windowHeight);

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
  background(220);
  strokeWeight(4);

  let cellHeight = windowHeight / ROWS;
  let cellWidth = windowWidth / (2 * COLS);

  // The grid
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      let cellX = col * cellWidth;
      let cellY = row * cellHeight;
      const PADDING = 20;
      rect(cellX, cellY, cellWidth, cellHeight);

      // Draw the X's or the O's
      switch (board[col][row].value) {
        case "X":
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
          ellipse(
            cellX + cellWidth / 2,
            cellY + cellHeight / 2,
            cellWidth - 3 * PADDING
          );
        default:
          break;
      }
    }
  }
}

function mouseClicked() {
  let cellHeight = windowHeight / ROWS;
  let cellWidth = windowWidth / (2 * COLS);
  let selected = board[int(mouseX / cellWidth)][int(mouseY / cellHeight)].value;
  board[int(mouseX / cellWidth)][int(mouseY / cellHeight)].value =
    selected == "X" ? "O" : "X";
}
