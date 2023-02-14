const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function isInteresting(number, awesomePhrases) {
  // Go to town!

  // Any digit followed by all zeros: 100, 90000
  function followedByAllZeros(number) {
    return /^\d00+$/.test(number.toString()) ? true : false;
  }

  // Every digit is the same number: 1111
  function everyDigitIsTheSame(number) {
    number = number.toString().split('');
    return number.every((i) => i === number[0]);
  }

  // The digits are sequential, incrementing (0 comes after 9): 1234, 7890
  // The digits are sequential, decrementing (0 comes after 1): 4321, 3210
  function digitsAreSequential(number, step) {
    number = number
      .toString()
      .split('')
      .map((i) => Number(i));
    return number.every((curr, i) => {
      return i === 0 ? true : curr === Number((number[i - 1] + step).toString().slice(-1));
    });
  }

  function digitsAreIncrementing(number) {
    return digitsAreSequential(number, 1);
  }

  function digitsAreDecrementing(number) {
    return digitsAreSequential(number, -1);
  }

  // The digits are a palindrome: 1221 or 73837
  function isPalindrome(number) {
    number = number.toString().split('');
    return number.every((curr, i) => curr === number[number.length - 1 - i]);
  }

  // The digits match one of the values in the awesomePhrases array
  function inAwesomePhrases(number, awesomePhrases) {
    return awesomePhrases.find((i) => i === number) ? true : false;
  }

  // Test for interesting numbers
  let numberStatus = 0;

  if (
    followedByAllZeros(number) ||
    everyDigitIsTheSame(number) ||
    inAwesomePhrases(number, awesomePhrases) ||
    isPalindrome(number, awesomePhrases) ||
    digitsAreIncrementing(number) ||
    digitsAreDecrementing(number)
  ) {
    // Number is interesting
    numberStatus = 2;
  } else if (
    followedByAllZeros(number + 1) ||
    followedByAllZeros(number + 2) ||
    everyDigitIsTheSame(number + 1) ||
    everyDigitIsTheSame(number + 2) ||
    inAwesomePhrases(number + 1, awesomePhrases) ||
    inAwesomePhrases(number + 2, awesomePhrases) ||
    isPalindrome(number + 1, awesomePhrases) ||
    isPalindrome(number + 2, awesomePhrases) ||
    digitsAreIncrementing(number + 1) ||
    digitsAreIncrementing(number + 2) ||
    digitsAreDecrementing(number + 1) ||
    digitsAreDecrementing(number + 2)
  ) {
    // Number is almost interesting
    numberStatus = 1;
  }

  // A number is only interesting if it is greater than 99
  numberStatus = number <= 99 && numberStatus === 2 ? 1 : numberStatus;

  // Interesting numbers are 3-or-more digit numbers
  numberStatus = number < 98 && number.toString().length < 3 ? 0 : numberStatus;

  return numberStatus;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  // followed by all zeros
  assert.equals(isInteresting(100, []), 2);
  assert.equals(isInteresting(90000, []), 2);

  // every digit is the same
  assert.equals(isInteresting(1111, []), 2);
  assert.equals(isInteresting(222, []), 2);
  assert.equals(isInteresting(444444, []), 2);
  assert.equals(isInteresting(1, []), 0);
  assert.equals(isInteresting(11, []), 0);

  // sequential, incrementing (0 comes after 9)
  assert.equals(isInteresting(1234, []), 2);
  assert.equals(isInteresting(7890, []), 2);

  // sequential, decrementing (0 comes after 1)
  assert.equals(isInteresting(4321, []), 2);
  assert.equals(isInteresting(3210, []), 2);

  // palindrome
  assert.equals(isInteresting(1221, []), 2);
  assert.equals(isInteresting(73837, []), 2);

  // "boring" numbers
  assert.equals(isInteresting(3, [1337, 256]), 0); // 0
  assert.equals(isInteresting(3236, [1337, 256]), 0); // 0

  // progress as we near an "interesting" number
  assert.equals(isInteresting(11207, []), 0); // 0
  assert.equals(isInteresting(11208, []), 0); // 0
  assert.equals(isInteresting(98, []), 1); // 1
  assert.equals(isInteresting(99, []), 1); // 1
  assert.equals(isInteresting(11209, []), 1); // 1
  assert.equals(isInteresting(11210, []), 1); // 1
  assert.equals(isInteresting(11211, []), 2); // 2

  // nearing a provided "awesome phrase"
  assert.equals(isInteresting(1335, [1337, 256]), 1); // 1
  assert.equals(isInteresting(1336, [1337, 256]), 1); // 1
  assert.equals(isInteresting(1337, [1337, 256]), 2); // 2
  assert.equals(isInteresting(80083, [80085]), 1); // 2

  // tests
  assert.equals(isInteresting(3, [1337, 256]), 0);
  assert.equals(isInteresting(1336, [1337, 256]), 1);
  assert.equals(isInteresting(1337, [1337, 256]), 2);
  assert.equals(isInteresting(11208, [1337, 256]), 0);
  assert.equals(isInteresting(11209, [1337, 256]), 1);
  assert.equals(isInteresting(11211, [1337, 256]), 2);
}
