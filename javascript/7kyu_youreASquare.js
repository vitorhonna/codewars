const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function isSquare(n) {
  return Number.isInteger(n ** 0.5);
}

//  ----------------------- TESTS -----------------------

assert.equals(isSquare(-1), false);
assert.equals(isSquare(0), true);
assert.equals(isSquare(3), false);
assert.equals(isSquare(4), true);
assert.equals(isSquare(25), true);
assert.equals(isSquare(26), false);
