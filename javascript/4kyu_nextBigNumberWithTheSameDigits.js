const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function nextBigger(n) {
  n = n.toString();

  if (n.length === 1 || n.split('').every((i) => i == n[0])) return -1;

  function computePermutations(str) {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];

    return str
      .split('')
      .reduce(
        (perms, num, i) => [...perms, ...computePermutations(str.slice(0, i) + str.slice(i + 1)).map((e) => num + e)],
        []
      );
  }

  const permutations = computePermutations(n)
    .map((i) => Number(i))
    .sort((a, b) => a - b)
    .filter((num, i, perms) => !perms.slice(0, i).includes(num));

  const i = permutations.indexOf(Number(n));

  console.log('len:', permutations.length)

  return i === permutations.length - 1 ? -1 : permutations[i + 1];
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(nextBigger(9), -1);
  assert.equals(nextBigger(111), -1);
  assert.equals(nextBigger(12), 21);
  assert.equals(nextBigger(513), 531);
  assert.equals(nextBigger(531), -1);
  assert.equals(nextBigger(2017), 2071);
  assert.equals(nextBigger(414), 441);
  assert.equals(nextBigger(144), 414);
  assert.equals(nextBigger(123456789), 123456798);
  // assert.equals(nextBigger(123456789), 123456798);
  // assert.equals(nextBigger(2503507532), 2503520357);
  // assert.equals(nextBigger(902508551935), 902508551953);
}
