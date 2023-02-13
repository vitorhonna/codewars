const assert = require('./tester.js');

// Provided dictionary with the Morse code table:

const MORSE_CODE = {
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '-.-.--': '!',
  '.-.-.-': '.',
  '--..--': ',',
};

// ------------------------ CODE ------------------------

const decodeBits = function (bits) {
  // ToDo: Accept 0's and 1's, return dots, dashes and spaces
  if (bits.length === 0) return '';

  bits = bits.replace(/(^0+|0+$)/g, '');

  let timeFactor = 1;

  if (bits.search('0') === -1) {
    timeFactor = bits.length;
  } else {
    const maxSequentialZeros = Math.max(...bits.match(/0+/g).map((i) => i.length));
    const maxSequentialOnes = Math.max(...bits.match(/1+/g).map((i) => i.length));

    if (maxSequentialZeros === maxSequentialOnes) {
      timeFactor = maxSequentialZeros;
    } else if (/0{7}/.test(bits) && maxSequentialZeros % 7 === 0) {
      timeFactor = maxSequentialZeros / 7;
    } else if (/0{3}/.test(bits) && maxSequentialZeros % 3 === 0) {
      timeFactor = maxSequentialZeros / 3;
    } else {
      timeFactor = maxSequentialZeros;
    }
  }

  return bits
    .replace(new RegExp(`0{${timeFactor * 7}}`, 'g'), '   ')
    .replace(new RegExp(`1{${timeFactor * 3}}`, 'g'), '-')
    .replace(new RegExp(`0{${timeFactor * 3}}`, 'g'), ' ')
    .replace(new RegExp(`1{${timeFactor * 1}}`, 'g'), '.')
    .replace(new RegExp(`0{${timeFactor * 1}}`, 'g'), '')
    .trim();
};

const decodeMorse = function (morseCode) {
  // ToDo: Accept dots, dashes and spaces, return human-readable message
  return morseCode
    .trim()
    .split('   ')
    .map((word) => {
      return word
        .split(' ')
        .map((char) => {
          return MORSE_CODE[char];
        })
        .join('');
    })
    .join(' ');
};

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(
    decodeMorse(
      decodeBits(
        '000000000000001100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011'
      )
    ),
    'HEY JUDE'
  );

  tests = [
    ['1', 'E'],
    ['101', 'I'],
    ['10001', 'EE'],
    ['10111', 'A'],
    ['1110111', 'M'],
    ['111', 'E'],
    ['1111111', 'E'],
    ['110011', 'I'],
    ['111000111', 'I'],
    ['111110000011111', 'I'],
    ['11111100111111', 'M'],
    ['111000000000111', 'EE'],
    ['111000111000111', 'S'],
    ['01110', 'E'],
    ['000000011100000', 'E'],
    [
      '00011100010101010001000000011101110101110001010111000101000111010111010001110101110000000111010101000101110100011101110111000101110111000111010000000101011101000111011101110001110101011100000001011101110111000101011100011101110001011101110100010101000000011101110111000101010111000100010111010000000111000101010100010000000101110101000101110001110111010100011101011101110000000111010100011101110111000111011101000101110101110101110',
      'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.',
    ],
    [
      '11111111111111100000000000000011111000001111100000111110000011111000000000000000111110000000000000000000000000000000000011111111111111100000111111111111111000001111100000111111111111111000000000000000111110000011111000001111111111111110000000000000001111100000111110000000000000001111111111111110000011111000001111111111111110000011111000000000000000111111111111111000001111100000111111111111111000000000000000000000000000000000001111111111111110000011111000001111100000111110000000000000001111100000111111111111111000001111100000000000000011111111111111100000111111111111111000001111111111111110000000000000001111100000111111111111111000001111111111111110000000000000001111111111111110000011111000000000000000000000000000000000001111100000111110000011111111111111100000111110000000000000001111111111111110000011111111111111100000111111111111111000000000000000111111111111111000001111100000111110000011111111111111100000000000000000000000000000000000111110000011111111111111100000111111111111111000001111111111111110000000000000001111100000111110000011111111111111100000000000000011111111111111100000111111111111111000000000000000111110000011111111111111100000111111111111111000001111100000000000000011111000001111100000111110000000000000000000000000000000000011111111111111100000111111111111111000001111111111111110000000000000001111100000111110000011111000001111111111111110000000000000001111100000000000000011111000001111111111111110000011111000000000000000000000000000000000001111111111111110000000000000001111100000111110000011111000001111100000000000000011111000000000000000000000000000000000001111100000111111111111111000001111100000111110000000000000001111100000111111111111111000000000000000111111111111111000001111111111111110000011111000001111100000000000000011111111111111100000111110000011111111111111100000111111111111111000000000000000000000000000000000001111111111111110000011111000001111100000000000000011111111111111100000111111111111111000001111111111111110000000000000001111111111111110000011111111111111100000111110000000000000001111100000111111111111111000001111100000111111111111111000001111100000111111111111111',
      'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.',
    ],
    ['111111100000001111111', 'I'],
    ['1110000000111', 'T T'],
  ];

  for (test of tests) {
    assert.equals(decodeMorse(decodeBits(test[0])), test[1]);
  }
}
