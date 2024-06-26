import {
  WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,
} from "./connect4.js";


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const $htmlBoard = document.querySelector("#board");

  // FIXME: Edit comments for function
  // Making top row that allows user to pick column for piece
  // Creating $top element table row, and giving it an id of column-top
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // Creating table data equal to the length of WIDTH, giving it an unique id,
  // adding an event listener, and appending it to the top of page.
  // Create clickable board pieces for players
  for (let x = 0; x < WIDTH; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.addEventListener("click", handleClick);
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const $row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const $cell = document.createElement('td');

      $cell.setAttribute("id", `c-${y}-${x}`);

      $row.append($cell);

    }
    $htmlBoard.append($row);

  }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const $piece = document.createElement('div');
  //$piece.setAttribute('class', `p${gameState.currPlayer}`);
  //$piece.setAttribute('class', 'piece');
  $piece.classList.add('piece', `p${gameState.currPlayer}`);

  const boardPlace = document.querySelector(`#c-${y}-${x}`);
  boardPlace.appendChild($piece);
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}


/**
 * Mutates game board state by taking in y and x variables and adding player
 * number to that index of array.
 */
function updateGameBoard(y, x) {
  const board = gameState.board;
  const player = gameState.currPlayer;
  board[y][x] = player;
}

/**
 * checks array at index 0 for empty slots, and returns true if filled, false
 * otherwise.
 */
function checkForTie() {
  const topRow = gameState.board[0];
  return topRow.every(value => value !== null);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board
  updateGameBoard(y, x);


  // add to HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${gameState.currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  if (checkForTie()) {
    return endGame('The game is tied!');
  }

  switchCurrPlayer();
}


/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();

}


export { start };
