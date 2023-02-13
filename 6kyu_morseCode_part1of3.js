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

decodeMorse = function(morseCode){
  return morseCode
          .trim()
          .split('   ')
          .map((word)=> {
            return word.split(' ').map((char) => {
              return MORSE_CODE[char]
            }).join('')
          }).join(' ')
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(decodeMorse('.... . -.--   .--- ..- -.. .'), 'HEY JUDE');
  assert.equals(decodeMorse('   .... . -.--   '), 'HEY');
}
