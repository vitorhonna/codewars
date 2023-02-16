const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function solution(number) {
  if (number < 0) return 0;

  let result = 0;

  for (let i = 1; i < number; i++) result += i % 3 === 0 || i % 5 === 0 ? i : 0;

  return result;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(solution(10), 23);
}
