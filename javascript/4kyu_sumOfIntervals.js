const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function sumIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let currentInterval = intervals[0];

  let sum = 0;

  for (let i = 1; i < intervals.length; i++) {
    if (currentInterval[1] >= intervals[i][0]) {
      currentInterval[1] = Math.max(currentInterval[1], intervals[i][1]);
    } else {
      sum += currentInterval[1] - currentInterval[0];
      currentInterval = intervals[i];
    }
  }

  sum += currentInterval[1] - currentInterval[0];

  return sum;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  // Should return the correct sum for non overlapping intervals
  assert.equals(sumIntervals([[1, 5]]), 4);
  assert.equals(
    sumIntervals([
      [1, 5],
      [6, 10],
    ]),
    8
  );

  // Should return the correct sum for overlapping intervals
  assert.equals(
    sumIntervals([
      [1, 5],
      [1, 5],
    ]),
    4
  );
  assert.equals(
    sumIntervals([
      [1, 4],
      [7, 10],
      [3, 5],
    ]),
    7
  );
  assert.equals(
    sumIntervals([
      [1, 5],
      [5, 10],
    ]),
    9
  );
  assert.equals(
    sumIntervals([
      [1, 4],
      [3, 6],
      [5, 8],
      [7, 10],
      [9, 12],
    ]),
    11
  );
  assert.equals(
    sumIntervals([
      [1, 20],
      [2, 19],
      [5, 15],
      [8, 12],
    ]),
    19
  );

  // Should return the correct sum for large intervals
  let intervals = [
    { intervals: [[-1e9, 1e9]], sum: 2e9 },
    {
      intervals: [
        [0, 20],
        [-1e8, 10],
        [30, 40],
      ],
      sum: 1e8 + 30,
    },
  ];
  for (let i = 0; i < intervals.length; i++) {
    assert.equals(sumIntervals(intervals[i].intervals), intervals[i].sum);
  }
}
