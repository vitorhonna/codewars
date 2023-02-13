const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function isInteresting(number, awesomePhrases) {
  // Go to town!

  let numberStatus = 0;

  const checkAwesomePhrases = awesomePhrases.length > 0 ? true : false;

  // Any digit followed by all zeros: 100, 90000
  const followedByAllZeros = (number) => {
    return /^\d00+/.test(number.toString()) ? 2 : 0
  }

  // Every digit is the same number: 1111
  // The digits are sequential, incementing†: 1234
  // The digits are sequential, decrementing‡: 4321
  // The digits are a palindrome: 1221 or 73837
  // The digits match one of the values in the awesomePhrases array
  // † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
  // ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

  // A number is only interesting if it is greater than 99
  numberStatus = number < 99 ? (numberStatus - 1 > 0 ? numberStatus - 1 : numberStatus) : numberStatus;

  return numberStatus;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  // "boring" numbers
  assert.equals(isInteresting(3, [1337, 256]), 0); // 0
  assert.equals(isInteresting(3236, [1337, 256]), 0); // 0

  // progress as we near an "interesting" number
  assert.equals(isInteresting(11207, []), 0); // 0
  assert.equals(isInteresting(11208, []), 0); // 0
  assert.equals(isInteresting(11209, []), 1); // 1
  assert.equals(isInteresting(11210, []), 1); // 1
  assert.equals(isInteresting(11211, []), 2); // 2

  // nearing a provided "awesome phrase"
  assert.equals(isInteresting(1335, [1337, 256]), 1); // 1
  assert.equals(isInteresting(1336, [1337, 256]), 1); // 1
  assert.equals(isInteresting(1337, [1337, 256]), 2); // 2

  // tests
  assert.equals(isInteresting(3, [1337, 256]), 0);
  assert.equals(isInteresting(1336, [1337, 256]), 1);
  assert.equals(isInteresting(1337, [1337, 256]), 2);
  assert.equals(isInteresting(11208, [1337, 256]), 0);
  assert.equals(isInteresting(11209, [1337, 256]), 1);
  assert.equals(isInteresting(11211, [1337, 256]), 2);
}
