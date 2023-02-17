const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function rot13(message) {
  let encoded = '';
  for (let letter of message.split('')) {
    if (/[a-z]/.test(letter)) {
      const charCode = letter.codePointAt(0);
      encoded += charCode + 13 > 122 ? String.fromCharCode(charCode - 13) : String.fromCharCode(charCode + 13);
    } else if (/[A-Z]/.test(letter)) {
      const charCode = letter.codePointAt(0);
      encoded += charCode + 13 > 90 ? String.fromCharCode(charCode - 13) : String.fromCharCode(charCode + 13);
    } else {
      encoded += letter;
    }
  }
  return encoded;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(rot13('test'), 'grfg');
  assert.equals(rot13('Test'), 'Grfg');
}
