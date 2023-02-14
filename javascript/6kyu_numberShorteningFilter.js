const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function shortenNumber(suffixes, base) {
  return (input) => {
    // Ignore empty and non-numeric inputs
    if (input === '' || !Number(input)) return String(input);

    for (let exp = suffixes.length-1; exp >= 0; exp--) {
      let result = Math.floor(Number(input) / (base ** exp));
      
      if (result > 0) {
        return `${result}${suffixes[exp]}`;
      }
    }
  };
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  const filter1 = shortenNumber(['', 'k', 'm'], 1000);
  assert.equals(filter1('234324'), '234k');
  assert.equals(filter1('98234324'), '98m');
  assert.equals(filter1([1, 2, 3]), '1,2,3');
  assert.equals(filter1(''), '');
  assert.equals(filter1('32424234223'), '32424m');
  const filter2 = shortenNumber(['', 'KB', 'MB', 'GB'], 1024);
  assert.equals(filter2('32'), '32');
  assert.equals(filter2('2100'), '2KB');
  assert.equals(filter2('pippi'), 'pippi');
  assert.equals(filter2('2100k'), '2100k');
  assert.equals(filter2('1073741823'), '1023MB');
}
