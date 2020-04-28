window.Queen = class extends Piece {
  constructor(x, y, name, team) {
    super(x, y, name, team);
    this.hasMoved = false;
    this.directions = [
      createVector(1, 0),
      createVector(-1, 0),
      createVector(0, 1),
      createVector(0, -1),
    ];
    this.directions2 = [
      createVector(1, 1),
      createVector(1, -1),
      createVector(-1, -1),
      createVector(-1, 1),
    ];
  }

  getMoves(b=board.tiles) {
    const moves = this.getMovesInDirections(
      this.cord,
      this.team,
      this.directions,
      b
    );
    const moves2 = this.getMovesInDirections(
      this.cord,
      this.team,
      this.directions2,
      b
    );
    return moves.concat(moves2);
  }
};
