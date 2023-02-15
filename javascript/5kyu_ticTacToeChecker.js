const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function isSolved(board) {
  function checkRows(board) {
    board.forEach((row) => {
      if (row.every((i) => i == row[0] && i !== 0)) winner = row[0];
    });
  }

  function checkColumns(board) {
    const transposedBoard = board.map((_, colIndex) => board.map((row) => row[colIndex]));
    checkRows(transposedBoard);
  }

  function checkDiagonals(board) {
    let diagonals = [[], []];
    board.forEach((row, i) => {
      diagonals[0].push(row[i]);
      diagonals[1].push(row[board.length - 1 - i]);
    });
    checkRows(diagonals);
  }

  let winner = 0;

  checkRows(board);
  checkColumns(board);
  checkDiagonals(board);

  // Return -1 if the board is not yet finished AND no one has won yet (there are empty spots)
  if (winner === 0 && board.some((i) => i.some((j) => j === 0))) return -1;

  // Return 0 if it's a draw
  return winner;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(
    isSolved([
      [0, 0, 1],
      [0, 1, 2],
      [2, 1, 0],
    ]),
    -1
  );
  assert.equals(
    isSolved([
      [1, 1, 1],
      [0, 2, 2],
      [2, 1, 0],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [0, 2, 2],
      [1, 1, 1],
      [2, 1, 0],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [0, 2, 2],
      [2, 1, 0],
      [1, 1, 1],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [1, 2, 2],
      [1, 2, 0],
      [1, 0, 1],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [0, 1, 2],
      [2, 1, 0],
      [1, 1, 2],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [2, 2, 1],
      [0, 2, 1],
      [1, 0, 1],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [2, 2, 1],
      [0, 1, 2],
      [1, 0, 1],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [1, 2, 1],
      [0, 1, 2],
      [2, 0, 1],
    ]),
    1
  );
  assert.equals(
    isSolved([
      [2, 2, 2],
      [0, 1, 0],
      [1, 0, 1],
    ]),
    2
  );
  assert.equals(
    isSolved([
      [2, 1, 2],
      [2, 1, 1],
      [1, 2, 1],
    ]),
    0
  );
}
