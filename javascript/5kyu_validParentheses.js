const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function validParentheses(parens) {
  if (parens.length === 0) return true;

  if (parens[0] === ')' || parens[parens.length - 1] === '(') return false;

  return validParentheses(parens.replace('()', ''));
}

// function validParentheses(parens) {
//   while (parens.length >= 0) {
//     parens = parens.replace('()', '');

//     if (parens.length === 0) return true;

//     if (parens[0] === ')' || parens[parens.length - 1] === '(') return false;
//   }
// }

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(validParentheses('()()'), true);
  assert.equals(validParentheses(')()('), false);
  assert.equals(validParentheses('())'), false);
  assert.equals(validParentheses('('), false);
  assert.equals(validParentheses(')'), false);
  assert.equals(validParentheses(''), true);
  assert.equals(validParentheses('()'), true);
}
