class Pawn extends Piece {
  constructor(x, y, name, team) {
    super(x, y, name, team);
    this.directions =
      this.team == "Black"
        ? [
            createVector(0, 1),
            createVector(0, 2),
            createVector(-1, 1),
            createVector(1, 1),
          ]
        : [
            createVector(0, -1),
            createVector(0, -2),
            createVector(1, -1),
            createVector(-1, -1),
          ];
  }

  getMoves(b=board.tiles) {
    let moves = [];
    let firstTile;
    this.directions.forEach((dir, index) => {
      const tile = this.tryPiece(this.cord.x + dir.x, this.cord.y + dir.y, b);
      if(index === 0){firstTile = tile;}
      if (!tile || (index === 1 && (this.hasMoved || firstTile.piece || tile.piece))) {
        return;
      } else if ((index >= 2 && !tile.piece) || tile.piece?.team == this.team) {
        return;
      } else if (index == 0 && tile.piece) {
        return;
      }
      moves.push(tile);
    });
    return moves;
  }
}

// this.possibleMoves.map((move, index) => {
//     let tile;
//     try {
//       tile =
//         this.team === "White"
//           ? board.tiles[this.cord.x - move[0]][this.cord.y - move[1]]
//           : board.tiles[this.cord.x + move[0]][this.cord.y + move[1]];
//       if (tile) {
//         if (index == 1 && this.hasMoved) {
//           return;
//         } else if (index >= 1 && !canAttack(this.team, tile)) {
//           return;
//         } else if (tile.team === this.team) {
//           return;
//         }
//         moves.push(tile);
//       }
//     } catch (e) {}
//   });
