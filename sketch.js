let COLS = 3;
let ROWS = 3;
let board = [];

totalWidth = 600;
totalHeight = totalWidth;

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
          stroke(243, 139, 168);
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

  // Check for ties or wins
  for (let row = 0; row < ROWS; row++) {}
}

function mouseClicked() {
  let cellHeight = totalHeight / ROWS;
  let cellWidth = totalWidth / COLS;
  let selected = board[int(mouseX / cellWidth)][int(mouseY / cellHeight)].value;
  board[int(mouseX / cellWidth)][int(mouseY / cellHeight)].value =
    selected == "X" ? "O" : "X";
}
