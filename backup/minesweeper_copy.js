class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
  //Create instances needed for the board that will be used by methods
  this._numberOfBombs = numberOfBombs
  this._numberOfTiles = numberOfRow * numberOfColumns
  this._playerBoard = generatePlayerBoard(numberOfRows,numberOfColumns)
  this._bombBoard = generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs)
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
        this_.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
    }
    this._numberOfTiles--;
  }
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
  //Method to print the game board to the player
  print(board) {
      console.log(board.map(row => row.join(' | ')).join('\n'));
    };
  }
}




//function to genereate the players guess board
const generatePlayerBoard = (numberOfRows, numberOfColumns) =>
{
  let board = [];
  for (let rows = 0; rows < numberOfRows; rows++)
   {
    let row = [];
    for (let columns = 0; columns < numberOfColumns; columns++)
    {
      row.push(' ');
    };
  board.push(row);
  };
  return board;
};

//function to generate the background bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>
{
  let board = [];
  for (let rows = 0; rows < numberOfRows; rows++)
   {
    let row = [];
    for (let columns = 0; columns < numberOfColumns; columns++)
    {
      row.push(null);
    };
  board.push(row);
  };
let numberOfBombsPlaced = 0;
while (numberOfBombsPlaced != numberOfBombs)
{
  let randomRowIndex = Math.floor(Math.random() * numberOfRows);
  let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
  if (board[randomRowIndex][randomColumnIndex] !== 'B'){
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
};
};
  return board;
};




//Generate a gomeboard to test functions
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

//Print the gameboards to test functions
console.log("Player Board: ");
printBoard(playerBoard);

console.log("Bomb Board: ");
printBoard(bombBoard);

flipTile(playerBoard,bombBoard,0,0)
console.log("Updated Player Board: ")
printBoard(playerBoard)
