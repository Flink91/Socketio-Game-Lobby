function Game(id, name, players) {
  this.id = id;
  this.name = name;
  this.players = players;
  this.currentPlayer = 0;
  this.boardState = [];
}

Game.prototype.startGame = function (options) {
  // calculate starting player, set options
  this.currentPlayer = Math.floor((Math.random() * this.players.length) + 1);
  // TODO base on options
  console.log("Starting game. Options:");
  console.log(options);

  this.boardState = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
}

Game.prototype.nextTurn = function (turn) {

  // if (this.checkWin()) return false;

  console.log(this.boardState);
  console.log(this.currentPlayer);

  var x = turn[0];
  var y = turn[1];

  this.boardState[y][x] = this.currentPlayer;

  if (this.players.length <= this.currentPlayer) {
    this.currentPlayer = 1;
  } else {
    this.currentPlayer++;
  }

  console.log(this.boardState);
  console.log(this.currentPlayer);

  return true;
};

Game.prototype.checkWin = function () {
  if (horizontalWin() || verticalWin() || diagonalWin()) return true;

  function horizontalWin() {
    var currentValue = null,
      previousValue = 0,
      tally = 0;

    // Scan each row in series, tallying the length of each series. If a series
    // ever reaches four, return true for a win.
    for (var y = 0; y <= 5; y++) {
      for (var x = 0; x <= 6; x++) {
        console.log(this.boardState);
        currentValue = this.boardState[y][x];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
      }

      // After each row, reset the tally and previous value.
      tally = 0;
      previousValue = 0;
    }

    // No horizontal win was found.
    return false;
  }

  function verticalWin() {
    var currentValue = null,
      previousValue = 0,
      tally = 0;

    // Scan each column in series, tallying the length of each series. If a
    // series ever reaches four, return true for a win.
    for (var x = 0; x <= 6; x++) {
      for (var y = 0; y <= 5; y++) {
        currentValue = this.boardState[y][x];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
      }

      // After each column, reset the tally and previous value.
      tally = 0;
      previousValue = 0;
    }

    // No vertical win was found.
    return false;
  }

  function diagonalWin() {
    var x = null,
      y = null,
      xtemp = null,
      ytemp = null,
      currentValue = null,
      previousValue = 0,
      tally = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
      xtemp = x;
      ytemp = 0;

      while (xtemp <= 6 && ytemp <= 5) {
        currentValue = this.boardState[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-right one diagonal index.
        xtemp++;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
      xtemp = x;
      ytemp = 0;

      while (0 <= xtemp && ytemp <= 5) {
        currentValue = this.boardState[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-left one diagonal index.
        xtemp--;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
      xtemp = 0;
      ytemp = y;

      while (xtemp <= 6 && ytemp <= 5) {
        currentValue = this.boardState[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-right one diagonal index.
        xtemp++;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
      xtemp = 6;
      ytemp = y;

      while (0 <= xtemp && ytemp <= 5) {
        currentValue = this.boardState[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          // Reset the tally if you find a gap.
          tally = 0;
        }
        if (tally === config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;

        // Shift down-left one diagonal index.
        xtemp--;
        ytemp++;
      }
      // Reset the tally and previous value when changing diagonals.
      tally = 0;
      previousValue = 0;
    }

    // No diagonal wins found. Return false.
    return false;
  }
}



module.exports = Game;