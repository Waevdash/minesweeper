'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game Over!');
        this._board.print();
      } else if (this._board.hasSafeTiles === false) {
        console.log('Congratulations! You Won!');
      } else {
        console.log("Current Board:");
        this._board.print();
      }
    }
  }]);

  return Game;
}();

//Create Board for player to play on


var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    //Create instances needed for the board that will be used by methods
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  //create getter method to return the players board when called


  _createClass(Board, [{
    key: 'flipTile',

    //Method to allow player to flip a tile
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log("This tile has already been flipped!");
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',

    //Method to grab number of bombs near the selected space
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1], [1, 0], [-1, 0]];
      var numberOfRows = this._bombBoard.length;
      var numberofColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfRows) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            _this._numberOfBombs++;
          };
        };
      });
      return this._numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',

    //Method to check the remaining amount of safe tiles (needed for player to win)
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',

    //Method to print the game board to the player
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'generatePlayerBoard',

    //Method to genereate the players guess board (the board the player sees)
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var columns = 0; columns < numberOfColumns; columns++) {
          row.push(' ');
        };
        board.push(row);
      };
      return board;
    }
  }, {
    key: 'generateBombBoard',

    //Method to generate the background bomb board (places bombs on player board)
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var columns = 0; columns < numberOfColumns; columns++) {
          row.push(null);
        };
        board.push(row);
      };
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced != numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        };
      };
      return board;
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 2);