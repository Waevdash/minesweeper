class Game{
  constructor(numberOfRows,numberOfColumns,numberOfBombs){
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }
  playMove(rowIndex,columnIndex){
    this._board.flipTile(rowIndex,columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over!');
      this._board.print();
    } else if (this._board.hasSafeTiles === false) {
        console.log('Congratulations! You Won!');
    } else {
        console.log("Current Board:");
        this._board.print()
    }
  }
}

//Create Board for player to play on
class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
  //Create instances needed for the board that will be used by methods
  this._numberOfBombs = numberOfBombs;
  this._numberOfTiles = numberOfRows * numberOfColumns;
  this._playerBoard = this.generatePlayerBoard(numberOfRows,numberOfColumns);
  this._bombBoard = this.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
}
  //create getter method to return the players board when called
  get playerBoard(){
    return this._playerBoard
  }
  //Method to allow player to flip a tile
  flipTile(rowIndex,columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
    }
    this._numberOfTiles--;
  };
  //Method to grab number of bombs near the selected space
  getNumberOfNeighborBombs(rowIndex,columnIndex)  {
    const neighborOffsets = [[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0]];
    const numberOfRows = this._bombBoard.length;
    const numberofColumns = this._bombBoard[0].length;
    let numberOfBombs = 0
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >=0 && neighborColumnIndex < numberOfRows) {
        if (this._bombBoard [neighborRowIndex][neighborColumnIndex] === 'B'){
          this._numberOfBombs++;
        };
      };
    });
    return this._numberOfBombs;
  };
  //Method to check the remaining amount of safe tiles (needed for player to win)
  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  };
  //Method to print the game board to the player
  print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };
  //Method to genereate the players guess board (the board the player sees)
  generatePlayerBoard(numberOfRows,numberOfColumns) {
    let board = [];
    for (let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(' ');
      };
    board.push(row);
    };
    return board;
  };
  //Method to generate the background bomb board (places bombs on player board)
  generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(null);
      };
    board.push(row);
    };
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced != numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      };
    };
    return board;
  };
}

const g = new Game(3,3,3)
g.playMove(0,2)
