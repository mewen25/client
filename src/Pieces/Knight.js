window.Knight = class extends Piece {
  constructor(x, y, name, team) {
    super(x, y, name, team);
    this.hasMoved = false;
    this.possibleMoves = [
      [-1, 2],
      [1, 2],
      [-1, -2],
      [1, -2],
      [2, -1],
      [2, 1],
      [-2, -1],
      [-2, 1],
    ];
  }

  getMoves(b=board.tiles) {
    let moves = [];
    this.possibleMoves.map((move, index) => {
      let tile;
      try {
        tile =
          this.team === "White"
            ? b[this.cord.x - move[0]][this.cord.y - move[1]]
            : b[this.cord.x + move[0]][this.cord.y + move[1]];
        if (tile) {
          if (tile.piece?.team == this.team) {
            return;
          }
          moves.push(tile);
        }
      } catch (e) {}
    });
    return moves;
  }
};
