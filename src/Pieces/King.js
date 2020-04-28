window.King = class extends Piece {
  constructor(x, y, name, team) {
    super(x, y, name, team);
    this.hasMoved = false;
    this.possibleMoves = [
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
    ];
    this.check = false;
  }

  getMoves(board=board.tiles) {
    let moves = [];
    this.possibleMoves.map((move, index) => {
      let tile;
      try {
        tile =
          this.team === "White"
            ? board[this.cord.x - move[0]][this.cord.y - move[1]]
            : board[this.cord.x + move[0]][this.cord.y + move[1]];
        if (tile) {
          if (tile.piece?.team === this.team) {
            return;
          }
          moves.push(tile);
        }
      } catch (e) {}
    });
    return moves;
  }
};
