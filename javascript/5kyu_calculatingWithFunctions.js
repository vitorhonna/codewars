const assert = require('./tester.js');

// ------------------------ CODE ------------------------

const calc = (n, operation) => (operation === '' ? n : ~~eval(`${n}${operation}`));

const zero = (operation = '') => calc(0, operation);
const one = (operation = '') => calc(1, operation);
const two = (operation = '') => calc(2, operation);
const three = (operation = '') => calc(3, operation);
const four = (operation = '') => calc(4, operation);
const five = (operation = '') => calc(5, operation);
const six = (operation = '') => calc(6, operation);
const seven = (operation = '') => calc(7, operation);
const eight = (operation = '') => calc(8, operation);
const nine = (operation = '') => calc(9, operation);

const plus = (n) => `+${n}`;
const minus = (n) => `-${n}`;
const times = (n) => `*${n}`;
const dividedBy = (n) => `/${n}`;

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(seven(times(five())), 35);
  assert.equals(four(plus(nine())), 13);
  assert.equals(eight(minus(three())), 5);
  assert.equals(six(dividedBy(two())), 3);
}
