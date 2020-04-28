/* eslint-disable no-undef, no-unused-vars */
var pieces = [];
var board;
let chess;
let selectedTile = null;
let data;
let pawn;
//page size (board size)
var PAGE_WIDTH;
var PAGE_HEIGHT;
var tileSize;
var sound_move, sound_taken;

function preload() {
  data = loadJSON("../pieces.json");
  PAGE_WIDTH = 720;
  PAGE_HEIGHT = 720;
  tileSize = createVector(PAGE_WIDTH / 8, PAGE_HEIGHT / 8);

  sound_move = loadSound('../sounds/chess_move.wav');
  sound_taken = loadSound('../sounds/myMove.mp3');
  // sound_myMove = loadSound('../sounds/myMove.mp3');
  // sound_theirMove = loadSound('../sounds/theirMove.mp3');
}

function setup() {
  fill(0, 0, 0);
  createCanvas(PAGE_WIDTH, PAGE_HEIGHT);
  frameRate(30);

  board = new Board(PAGE_WIDTH, PAGE_HEIGHT);
  board.createBoard();
}

function draw() {
  board.drawBoard();
  fill(0);
  stroke(0);
  text(`Turn: ${board.turn}`, -10, 0);
  textSize(30);
}

const mouseOn = (x, y, w, h) =>
  mouseX >= x + 1 &&
  mouseX <= x - 1 + w &&
  mouseY >= y + 1 &&
  mouseY <= y - 1 + h;

function isHover(x1, x2, y1, y2) {
  if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
    console.log("true!");
    return true;
  }
  return false;
}

function canAttack(from, to) {
  return from === to.piece.team;
}

function mousePressed() {
  if (mouseOn(1, 1, PAGE_WIDTH, PAGE_HEIGHT)) {
    const selectedTile =
      board.tiles[Math.floor(mouseX / tileSize.x)][
        Math.floor(mouseY / tileSize.y)
      ];
    board.checkClick(selectedTile);
  } else {
    doResets(true);
  }
}

function mouseClicked() {
  if(board.selectedPiece) {
    board.checkPlace();
  }
}

function doResets(further = false) {
  board.tiles.forEach((xTiles) =>
    xTiles.forEach((tile) => (tile.highlight = false))
  );
  if (further) {
    board.selectedTile = undefined;
    board.selectedPiece = undefined;
  }
}
