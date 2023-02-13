const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function incrementString(str) {
  const match = str.match(/(?<zeros>0*)(?<digits>[1-9]*)$/);

  const prefix = str.slice(0, match.index);

  const digits = (Number(match.groups.digits) + 1).toString();

  const zeros =
    digits.length > match.groups.digits.length
      ? match.groups.zeros.substring(0, match.groups.zeros.length - 1)
      : match.groups.zeros;

  return prefix + zeros + digits;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(incrementString('foobar000'), 'foobar001');
  assert.equals(incrementString('foobar999'), 'foobar1000');
  assert.equals(incrementString('foobar00999'), 'foobar01000');
  assert.equals(incrementString('foo'), 'foo1');
  assert.equals(incrementString('foobar001'), 'foobar002');
  assert.equals(incrementString('foobar1'), 'foobar2');
  assert.equals(incrementString('1'), '2');
  assert.equals(incrementString('009'), '010');
  assert.equals(incrementString('fo99obar99'), 'fo99obar100');
}
