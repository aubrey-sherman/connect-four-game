/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

const gameState = {
  currPlayer: 1, // active player: 1 or 2
  board: Array(HEIGHT), // array of HEIGHT number of slots
  // Each array slot is empty to start, but will be filled in with an array
  // of WIDTH later.
  // These inner arrays will represent rows.
  // gameState.board[HEIGHT][0] represents the bottom-left spot on the board
};


function switchCurrPlayer() {
  // TODO: switch currPlayer 1 <-> 2
}

/**
 * Mutates gamestate.board to match global constats for width and height
 * and fills in each slot of board with null.
 */
function makeBoard() {
  const board = gameState.board;

  for (let y = 0; y < HEIGHT; y++) {
    board[y] = Array(WIDTH).fill(null);
  }
}


/** findSpotInCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled)
 */

function findSpotInCol(x) {
  let coordinateY = null;
  const board = gameState.board;

  for (let y = 0; y < board.length; y++) {
    const row = board[y];
    const pieceValue = row[x];
    if (pieceValue === null) {
      coordinateY = y;
    } else {
      return coordinateY;
    }
  }
  return coordinateY;
}




/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

    console.log('Cells:', areCellsValid(cells));
    console.log('Same color:', areAllSameColor(cells));
    return areCellsValid(cells) && areAllSameColor(cells);
  }

  /**
   * Input - array of array cells
   * Output - true or false determining whether all values are valid
   * Valid values are within board
   */

  function areCellsValid(cells) {
    return cells.every(cell => {
      const y = cell[0];
      const x = cell[1];

      if (y < HEIGHT && y >= 0 && x < WIDTH && x >= 0) {
        return true;
      } else {
        return false;
      }
    });
  }


  /**
   * Input - array of array cells
   * Output - true or false determining whether all cells have the same color
   * Valid values are within board
   */

  function areAllSameColor(cells) {
    const cellBoardPieces = cells.map(cell => {
      const y = cell[0];
      const x = cell[1];
      return gameState.board[y][x];
    }).filter(piece => piece !== null);

    if (cellBoardPieces.length !== 4) {
      return false;
    } else {
      let sumOfPieces = cellBoardPieces.reduce((a, b) => a + b, 0);
      if (sumOfPieces === 4 || sumOfPieces === 8) {
        return true;
      } else {
        return false;
      }
    }
  }


  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}


export {
  WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,
};
