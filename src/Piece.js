/* eslint-disable no-undef, no-unused-vars */
class Piece {
  constructor(x, y, name, team) {
    this.team = team ? "White" : "Black";
    this.colour = team ? color(30, 180, 30) : color(180, 30, 30);
    this.pos = createVector(
      Math.floor(tileSize.x * x),
      Math.floor(tileSize.y * y)
    );
    this.cord = createVector(x, y);
    this.name = name;
    this.image = loadImage(`../pieces/${data.pieces[this.team][this.name]}`);
    this.hasMoved = false;
  }

  render() {
    fill(this.colour);
    if (board.tiles[this.cord.x][this.cord.y].selected && mouseIsPressed) {
      tint(255, 127);
      image(this.image, this.pos.x, this.pos.y, tileSize.x, tileSize.y);
      tint(255);
    } else {
      if(board.gameStatus[0] === "Check" && board.gameStatus[1] === this){
        stroke(255, 105, 105, 210);
        strokeWeight(4);
        fill(255,105, 105, 100);
        ellipseMode(CENTER);
        ellipse(this.pos.x+(tileSize.x/2), this.pos.y+(tileSize.y/2), tileSize.x-5, tileSize.y-5);
        ellipseMode(CORNER);
        noStroke();
        tint(200, 40, 60);
        image(this.image, this.pos.x, this.pos.y, tileSize.x, tileSize.y);
        tint(255);
      }else{image(this.image, this.pos.x, this.pos.y, tileSize.x, tileSize.y);}
    }
  }

  drawPiece() {
    image(this.image, this.pos.x, this.pos.y, tileSize.x, tileSize.y);
  }

  hover() {
    if (mouseOn(this.pos.x, this.pos.y, 64)) {
      tint(255, 128, 0);
    } else {
      noTint();
    }
  }

  tryPiece(x, y, b) {
    try {
      const tile = b[x][y];
      if (tile) {
        return tile;
      }
    } catch (e) {}
  }

  getMovesInDirections(pos, team, direction, b) {
    let possibleMoves = [];
    direction.forEach((dir) => {
      for (var i = 1; i < 9; i++) {
        const tile = this.tryPiece(pos.x + dir.x * i, pos.y + dir.y * i, b);
        if (tile?.piece && tile.piece.team !== team) {
          possibleMoves.push(tile);
          break;
        }
        if (!tile || tile?.piece?.team == team) {
          break;
        }
        possibleMoves.push(tile);
      }
    });
    return possibleMoves;
  }

  moveTo(newTile) {
    this.pos = newTile.pos;
  }
}
