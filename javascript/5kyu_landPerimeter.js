const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function landPerimeter(arr) {
  function checkLocalContribution(arr, x, y) {
    if (arr[x][y] === 'O') return 0;

    const surroundings = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];

    let localContribution = 0;

    for (let s of surroundings) {
      if (s.x < 0 || s.x > arr.length - 1 || s.y < 0 || s.y > arr[0].length - 1 || arr[s.x][s.y] === 'O') {
        localContribution++;
      }
    }

    return localContribution;
  }

  let perimeter = 0;

  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[0].length; y++) {
      perimeter += checkLocalContribution(arr, x, y);
    }
  }

  return `Total land perimeter: ${perimeter}`;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(landPerimeter(['XOOO', 'XOXO', 'XOXO', 'OOXX', 'OOOO']), 'Total land perimeter: 18');
  assert.equals(landPerimeter(['XOOXO', 'XOOXO', 'OOOXO', 'XXOXO', 'OXOOO']), 'Total land perimeter: 24');
  assert.equals(
    landPerimeter(['OXOOOX', 'OXOXOO', 'XXOOOX', 'OXXXOO', 'OOXOOX', 'OXOOOO', 'OOXOOX', 'OOXOOO', 'OXOOOO', 'OXOOXX']),
    'Total land perimeter: 60'
  );
  assert.equals(
    landPerimeter(['OXOOO', 'OOXXX', 'OXXOO', 'XOOOO', 'XOOOO', 'XXXOO', 'XOXOO', 'OOOXO', 'OXOOX', 'XOOOO', 'OOOXO']),
    'Total land perimeter: 52'
  );
  assert.equals(
    landPerimeter(['XXXXXOOO', 'OOXOOOOO', 'OOOOOOXO', 'XXXOOOXO', 'OXOXXOOX']),
    'Total land perimeter: 40'
  );
  assert.equals(
    landPerimeter(['XOOOXOO', 'OXOOOOO', 'XOXOXOO', 'OXOXXOO', 'OOOOOXX', 'OOOXOXX', 'XXXXOXO']),
    'Total land perimeter: 54'
  );
  assert.equals(
    landPerimeter(['OOOOXO', 'XOXOOX', 'XXOXOX', 'XOXOOO', 'OOOOOO', 'OOOXOO', 'OOXXOO']),
    'Total land perimeter: 40'
  );
}
