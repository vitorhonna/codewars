const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function sumStrings(a, b) {
  // Deal with empty strings
  if (a === '' && b === '') return '0';

  // Remove leading zeros and convert to array of numbers
  a = a
    .replace(/(^0+)/g, '')
    .split('')
    .map((i) => Number(i));
  b = b
    .replace(/(^0+)/g, '')
    .split('')
    .map((i) => Number(i));

  let longer, shorter;
  if (a.length > b.length) {
    longer = a;
    shorter = b;
  } else {
    longer = b;
    shorter = a;
  }

  let sum = '';
  let carry = 0;

  for (let i = 0; i < longer.length; i++) {
    let partialSum = longer[longer.length - 1 - i] + (shorter[shorter.length - 1 - i] ?? 0) + carry;

    if (partialSum >= 10) {
      sum = i == longer.length - 1 ? partialSum.toString() + sum : (partialSum - 10).toString() + sum;
      carry = 1;
    } else {
      sum = partialSum.toString() + sum;
      carry = 0;
    }
  }

  return sum;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(sumStrings('123', '456'), '579');
  assert.equals(sumStrings('8797', '45'), '8842');
  assert.equals(sumStrings('800', '9567'), '10367');
  assert.equals(sumStrings('99', '1'), '100');
  assert.equals(sumStrings('00103', '08567'), '8670');
  assert.equals(sumStrings('', '5'), '5');
  assert.equals(sumStrings('', ''), '0');
  assert.equals(sumStrings('712569312664357328695151392', '8100824045303269669937'), '712577413488402631964821329');
}
