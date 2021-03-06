class Board {
  constructor() {
    this.tiles = [];
    this.pieces = [];
    this.selectedTile = undefined;
    this.selectedPiece = undefined;
    this.turn = 1;
    this.prevMove = [];
    this.pieceDrag = false;
    this.gameStatus = [];
    this.copyBoard = null;
  }

  createBoard() {
    var names = data.pieces.Names;
    for (var x = 0; x < 8; x++) {
      this.tiles[x] = [];
      for (var y = 0; y < 8; y++) {
        this.tiles[x][y] = new Tile(x, y, tileSize);
      }
    }
    for (var x = 0; x < 8; x++) {
      // Creates all the pieces - goes left to right doing both a pawn & the piece under that on both sides
      this.pieces.push(new window[names[x]](x, 0, names[x], false, tileSize));
      this.tiles[x][0].piece = this.pieces[this.pieces.length - 1];
      this.pieces.push(new Pawn(x, 1, names[8], false, tileSize));
      this.tiles[x][1].piece = this.pieces[this.pieces.length - 1];
      this.pieces.push(new window[names[x]](x, 7, names[x], true, tileSize));
      this.tiles[x][7].piece = this.pieces[this.pieces.length - 1];
      this.pieces.push(new Pawn(x, 6, names[8], true, tileSize));
      this.tiles[x][6].piece = this.pieces[this.pieces.length - 1];
    }
  }

  drawBoard() {
    background(10);
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        this.tiles[x][y].drawTile(); // Rendering pieces is handled inside the tile
      }
    }

    this.selectedPiece ? this.handleSelected() : null;
  }

  drawDragPiece() {
    if (mouseIsPressed) {
      this.selectedPiece ? this.pieceDrag = true : this.pieceDrag = false;
      imageMode(CENTER);
      image(this.selectedPiece.image, mouseX, mouseY, tileSize.x, tileSize.y);
      imageMode(CORNER);
    }
  }

  checkPlace() {
    const selected = this.tiles[Math.floor(mouseX / tileSize.x)][Math.floor(mouseY / tileSize.y)];
    if(selected.highlight || selected.cord === this.selectedTile.cord){this.checkClick(selected);}
    else{doResets(true);}
  }

  handleSelected = () => {
    this.drawDragPiece();
  }

  getValidMoves(sel) {
    const copyBoard = [this.tiles.slice(0), this.pieces.slice(0)];
    const moves = sel.getMoves().filter(move => {
      const fromTile = copyBoard[0][sel.cord.x][sel.cord.y];
      const toTile = copyBoard[0][move.cord.x][move.cord.y];
      const newCopyBoard = copyBoard.slice(0);
      newCopyBoard[0][toTile.cord.x][toTile.cord.y].piece = fromTile.piece;
      newCopyBoard[0][fromTile.cord.x][fromTile.cord.y].piece = null;
      newCopyBoard[0][toTile.cord.x][toTile.cord.y].piece.pos = toTile.pos;
      newCopyBoard[0][toTile.cord.x][toTile.cord.y].piece.cord = toTile.cord;
      console.log("new board?", newCopyBoard == copyBoard, newCopyBoard === copyBoard);
      return !this.isCheck(newCopyBoard, sel.team);
    })
    console.log("new moves?", moves);
  }

  // getValidMoves(selectedPiece) {
  //   this.copyBoard = [this.tiles.slice(0), this.pieces.slice(0)];
  //   let fromTile = this.copyBoard[0][selectedPiece.cord.x][selectedPiece.cord.y];
  //   const moves = fromTile.piece.getMoves().filter(move => {
  //     const toTile = this.copyBoard[0][move.cord.x][move.cord.y];
  //     toTile.piece = fromTile.piece;
  //     fromTile.piece = null;
  //     console.log("=?", this.copyBoard[0] === this.tiles);
  //     const result = !this.isCheck(this.copyBoard, selectedPiece.team);
  //     fromTile.piece = toTile.piece;
  //     return result;
  //   });
  //   console.log("Moves that can't be in check?", moves);
  //   return moves;
  // }
  
  isCheck(b, team) {
    let check = false;
    const pieces = b[1].filter(p => p.team !== team);
    pieces.forEach(piece => {
      piece.getMoves(b[0]).forEach(move => {
        if(move.piece?.name === "King" && move.piece?.team === team){
          check = true;
        }
      })
    })
    return check;
  }

  checkMoveConsequence(piece) {
    let status = [];
    piece.getMoves().forEach(tile => {
      if(tile.piece?.name === "King" && tile.piece?.team !== piece.team){
        console.log("That's check!", tile.piece.team, tile.piece.name);
        status = ["Check", tile.piece, piece];
      }
    })
    return status;
  }

  checkClick(selected) {
    const teamTurn = this.turn % 2 === 0 ? "Black" : "White";
    if (
      selected.piece &&
      selected.piece.team !== teamTurn &&
      !selected.highlight
    ) {
      return;
    }
    if (this.selectedPiece && selected.highlight) {
      // Do the move
      const currentTile = this.tiles[this.selectedTile.cord.x][
        this.selectedTile.cord.y
      ];
      const targetTile = this.tiles[selected.cord.x][selected.cord.y];
      this.transferPiece(currentTile, targetTile);
      selected = null;
      doResets(true);
    } else {
      // Selecting another Piece or empty square?
      doResets();
      this.selectedTile = selected;
      this.selectedPiece = selected.piece;
      selected.piece?.name
        ? selected.drawMoves(this.getValidMoves(selected.piece))
        : null;
    }
  }

  transferPiece(from, to) {
    to.piece ? sound_taken.play() : sound_move.play();
    to.piece = from.piece;
    to.piece.pos = to.pos;
    to.piece.cord = to.cord;
    from.piece = null;
    to.piece.hasMoved = true;
    this.turn++;
    this.gameStatus = this.checkMoveConsequence(to.piece);
    this.prevMove = [from, to];
  }
}
