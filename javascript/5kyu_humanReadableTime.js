const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function humanReadable(seconds) {
  let hr = Math.floor(seconds / 3600);
  seconds -= hr * 3600;
  let min = Math.floor(seconds / 60);
  seconds -= min * 60;
  const addZero = (n) => (n.toString().length == 1 ? '0' + n : n);
  return `${addZero(hr)}:${addZero(min)}:${addZero(seconds)}`;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(humanReadable(0), '00:00:00');
  assert.equals(humanReadable(59), '00:00:59');
  assert.equals(humanReadable(60), '00:01:00');
  assert.equals(humanReadable(90), '00:01:30');
  assert.equals(humanReadable(3599), '00:59:59');
  assert.equals(humanReadable(3600), '01:00:00');
  assert.equals(humanReadable(45296), '12:34:56');
  assert.equals(humanReadable(86399), '23:59:59');
  assert.equals(humanReadable(86400), '24:00:00');
  assert.equals(humanReadable(359999), '99:59:59');
}
