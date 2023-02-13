const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function getPINs(observed) {
  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [null, '0', null],
  ];

  const getAdjacents = (n) => {
    let adjacents = [];
    for (let i = 0; i < keypad.length; i++) {
      for (let j = 0; j < keypad[i].length; j++) {
        if (keypad[i][j] == n) {
          if (i - 1 >= 0 && keypad[i - 1][j] != null) adjacents.push(keypad[i - 1][j]);
          if (i + 1 <= keypad.length - 1 && keypad[i + 1][j] != null) adjacents.push(keypad[i + 1][j]);
          if (j - 1 >= 0 && keypad[i][j - 1] != null) adjacents.push(keypad[i][j - 1]);
          if (j + 1 <= keypad[i].length - 1 && keypad[i][j + 1] != null) adjacents.push(keypad[i][j + 1]);
        }
      }
    }
    return adjacents;
  };

  let variations = [''];

  for (let digit of observed) {
    const options = [digit, ...getAdjacents(digit)];
    const partialOptions = [];
    for (let option of options) {
      for (let variation of variations) {
        partialOptions.push(variation + option);
      }
    }
    variations = partialOptions;
  }

  return variations;
}

//  ----------------------- TESTS -----------------------

assert.equals(getPINs('8'), ['5', '7', '8', '9', '0']);
assert.equals(getPINs('11'), ['11', '22', '44', '12', '21', '14', '41', '24', '42']);
assert.equals(getPINs('369'), [
  '339',
  '366',
  '399',
  '658',
  '636',
  '258',
  '268',
  '669',
  '668',
  '266',
  '369',
  '398',
  '256',
  '296',
  '259',
  '368',
  '638',
  '396',
  '238',
  '356',
  '659',
  '639',
  '666',
  '359',
  '336',
  '299',
  '338',
  '696',
  '269',
  '358',
  '656',
  '698',
  '699',
  '298',
  '236',
  '239',
]);
