class Tile {
  constructor(x, y) {
    this.pos = createVector(tileSize.x * x, tileSize.y * y);
    this.cord = createVector(
      Math.floor(this.pos.x / tileSize.x),
      Math.floor(this.pos.y / tileSize.y)
    );
    this.colour = (x + y) % 2 === 0 ? color(181, 136, 99) : color(240, 217, 181);
    this.piece = null;
    this.selected = false;
    this.highlight = false;
  }

  drawTile() {
    board.selectedPiece === this.piece && this.piece ? (this.selected = true): (this.selected = false);
    noStroke();

    this.render(this.selected ? color(130,151,105) : board.prevMove[0] == this ? color(205,210,106) : board.prevMove[1] == this ? color(170,162,58) : this.colour);
    
    this.hover();

    this.piece ? this.piece.render() : null;

    this.highlight && !mouseOn(this.pos.x, this.pos.y, tileSize.x, tileSize.y) ? this.drawHighlights() : null;
  }

  drawMoves(moves) {
    moves.forEach((tile) => (tile.highlight = true));
  }

  hover() {
    if (
      !this.selected && this.highlight &&
      mouseOn(this.pos.x, this.pos.y, tileSize.x, tileSize.y)
    ) {
      fill(131,121,78);
      rect(this.pos.x, this.pos.y, tileSize.x, tileSize.y);
    }
  }

  drawHighlights() {
    fill(100,110,64);
    if(!this.piece){
    ellipseMode(CENTER);
    ellipse(this.pos.x+(tileSize.x/2), this.pos.y+(tileSize.y/2), tileSize.x/4, tileSize.y/4);
    ellipseMode(CORNER);
    } else{
      this.render(this.colour);
      this.piece ? this.piece.render() : null;
      fill(167, 204, 71);
      //triangle(40,75,48,20,76,75);
      triangle(this.pos.x, this.pos.y+20, this.pos.x, this.pos.y, this.pos.x+20, this.pos.y);
      triangle(this.pos.x+(tileSize.x - 20), this.pos.y, this.pos.x+tileSize.x, this.pos.y, this.pos.x+tileSize.x, this.pos.y+20);
      triangle(this.pos.x+20, this.pos.y+tileSize.y, this.pos.x, this.pos.y+tileSize.y, this.pos.x, this.pos.y+(tileSize.y - 20));
      triangle(this.pos.x+tileSize.x, this.pos.y+(tileSize.y - 20), this.pos.x+tileSize.x, this.pos.y+tileSize.y, this.pos.x+(tileSize.x - 20), this.pos.y+tileSize.y);
    }
  }

  render(col = this.colour) {
    fill(col);
    rect(this.pos.x, this.pos.y, tileSize.x, tileSize.y);
  }
}
