class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
  this._numberOfBombs = numberOfBombs
  this.numberOfTiles = numberOfRow * numberOfColumns
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

//function to grab number of bombs near the selected space
const getNumberOfNeighborBombs = (bombBoard,rowIndex,columnIndex) => {
  const neighborOffsets = [[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0]];
  const numberOfRows = bombBoard.length;
  const numberofColumns = bombBoard[0].length;
  let numberOfBombs = 0
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >=0 && neighborColumnIndex < numberOfRows) {
      if (bombBoard [neighborRowIndex][neighborColumnIndex] === 'B'){
        numberOfBombs++;
      };
    };
  });
  return numberOfBombs
};

//function to allow player to flip a tile
const flipTile = (playerBoard,bombBoard,rowIndex,columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' '){
    console.log("This tile has already been flipped!");
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
      playerBoard[rowIndex][columnIndex] = 'B'
  } else {
      playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex)
  };
};
6
//function to print the game board to the player
const printBoard = board =>
{
  console.log(board.map(row => row.join(' | ')).join('\n'));
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
