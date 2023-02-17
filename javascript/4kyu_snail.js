const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function snail(array) {
  let path = [];

  while (array.length > 0 && array[0].length > 0) {
    path.push(...array.shift());

    for (let i = 0; i < array.length - 1; i++) {
      path.push(array[i].pop());
    }

    if (array.length > 0) {
      path.push(...array.pop().reverse());

      for (let j = array.length - 1; j >= 0; j--) {
        path.push(array[j].shift());
      }
    }
  }

  return path;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.deepEquals(snail([[]]), []);
  assert.deepEquals(snail([[1]]), [1]);
  assert.deepEquals(
    snail([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]),
    [1, 2, 3, 6, 9, 8, 7, 4, 5]
  );
  assert.deepEquals(
    snail([
      [01, 02, 03, 04, 05],
      [06, 07, 08, 09, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ]),
    [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]
  );
  assert.deepEquals(
    snail([
      [01, 02, 03, 04, 05, 06],
      [20, 21, 22, 23, 24, 07],
      [19, 32, 33, 34, 25, 08],
      [18, 31, 36, 35, 26, 09],
      [17, 30, 29, 28, 27, 10],
      [16, 15, 14, 13, 12, 11],
    ]),
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36,
    ]
  );
}
