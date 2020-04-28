window.Bishop = class extends Piece {
  constructor(x, y, name, team) {
    super(x, y, name, team);
    this.hasMoved = false;
    this.directions = [
      createVector(1, 1),
      createVector(1, -1),
      createVector(-1, -1),
      createVector(-1, 1),
    ];
  }

  getMoves(b=board.tiles) {
    return this.getMovesInDirections(this.cord, this.team, this.directions, b);
  }
};
