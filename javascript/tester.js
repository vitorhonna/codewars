const assert = {
  testFailed(testResult, expectedResult) {
    console.log('---------------------------');
    console.log('TEST FAILED :(');
    console.log(`Test    : ${testResult}`);
    console.log(`Expected: ${expectedResult}`);
    console.log('');
    return 0;
  },

  testPassed() {
    console.log('TEST PASSED :)');
    return 1;
  },

  equals(testResult, expectedResult) {
    if (testResult === expectedResult) {
      return this.testPassed();
    } else if (typeof testResult == 'object' && typeof expectedResult == 'object') {
      const a = testResult.sort((a, b) => a - b).toString();
      const b = expectedResult.sort((a, b) => a - b).toString();

      if (a === b) {
        return this.testPassed();
      } else {
        return this.testFailed(testResult, expectedResult);
      }
    } else {
      return this.testFailed(testResult, expectedResult);
    }
  },
};

module.exports = assert;

// assert.strictEqual(false, false);
// assert.strictEqual(true, true);

// assert.strictEqual(null, null);
// assert.strictEqual(undefined, undefined);

// assert.strictEqual(-1, -1);
// assert.strictEqual(2, 2);
// assert.strictEqual(10000, 10000);

// assert.strictEqual('-1', '-1');
// assert.strictEqual('2', '2');
// assert.strictEqual('10000', '10000');
// assert.strictEqual('abc', 'abc');
// assert.strictEqual('', '');
// assert.strictEqual('    ', '    ');

// assert.strictEqual(['8', '5', '0', '7', '9'], ['5', '7', '8', '9', '0']);
// assert.strictEqual(
//   ['11', '41', '21', '14', '44', '24', '12', '42', '22'],
//   ['11', '22', '44', '12', '21', '14', '41', '24', '42']
// );
// assert.strictEqual(
//   [
//     '369',
//     '669',
//     '269',
//     '339',
//     '639',
//     '239',
//     '399',
//     '699',
//     '299',
//     '359',
//     '659',
//     '259',
//     '366',
//     '666',
//     '266',
//     '336',
//     '636',
//     '236',
//     '396',
//     '696',
//     '296',
//     '356',
//     '656',
//     '256',
//     '368',
//     '668',
//     '268',
//     '338',
//     '638',
//     '238',
//     '398',
//     '698',
//     '298',
//     '358',
//     '658',
//     '258',
//   ],
//   [
//     '339',
//     '366',
//     '399',
//     '658',
//     '636',
//     '258',
//     '268',
//     '669',
//     '668',
//     '266',
//     '369',
//     '398',
//     '256',
//     '296',
//     '259',
//     '368',
//     '638',
//     '396',
//     '238',
//     '356',
//     '659',
//     '639',
//     '666',
//     '359',
//     '336',
//     '299',
//     '338',
//     '696',
//     '269',
//     '358',
//     '656',
//     '698',
//     '699',
//     '298',
//     '236',
//     '239',
//   ]
// );
