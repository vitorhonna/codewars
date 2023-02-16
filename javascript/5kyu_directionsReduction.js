const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function dirReduc(arr) {
  let str = arr.join(' ');

  const len1 = str.length;

  str = str.replace(/NORTH\s+SOUTH|SOUTH\s+NORTH|EAST\s+WEST|WEST\s+EAST/g, '').trim();

  const len2 = str.length;

  return len1 === len2 ? str.split(' ').filter((i) => i) : dirReduc(str.split(' '));
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(dirReduc(['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH']), []);

  assert.equals(dirReduc(['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH', 'WEST']), ['WEST']);

  assert.equals(dirReduc(['NORTH', 'WEST', 'SOUTH', 'EAST']), ['NORTH', 'WEST', 'SOUTH', 'EAST']);

  assert.equals(dirReduc(['NORTH', 'SOUTH', 'EAST', 'WEST', 'EAST', 'WEST']), []);
}
