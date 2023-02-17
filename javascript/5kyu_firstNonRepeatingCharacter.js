const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function firstNonRepeatingLetter(s) {
  const uniques = s.split('').filter((curr, i) => !(s.slice(0, i) + s.slice(i + 1)).toLowerCase().includes(curr.toLowerCase()));

  return uniques.length === 0 ? '' : uniques[0] 
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(firstNonRepeatingLetter(''), '');
  assert.equals(firstNonRepeatingLetter('a'), 'a');
  assert.equals(firstNonRepeatingLetter('sTreSS'), 'T');
  assert.equals(firstNonRepeatingLetter('stress'), 't');
  assert.equals(firstNonRepeatingLetter('moonmen'), 'e');
}
