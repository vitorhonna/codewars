const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function determinant(m) {
  const n = m.length;

  if (n === 1) return m[0][0];

  if (n > 1) {
    let det = null; 

    for (let i = 0, sign = 1; i < n; i++, sign *= -1) {
      let submatrix = [];

      for (let j = 0; j < n; j++) {
        if (j === 0) continue;
        let temp = [...m[j]];
        temp.splice(i, 1);
        const row = temp;
        submatrix.push(row);
      }

      det += sign * m[0][i] * determinant(submatrix);
    }

    return det;
  }
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  const m1 = [
    [4, 6],
    [3, 8],
  ];
  const m5 = [
    [2, 4, 2],
    [3, 1, 1],
    [1, 2, 0],
  ];

  assert.equals(determinant([[1]]), 1);
  assert.equals(determinant(m1), 14); // '4*8 - 3*6, i.e. 14'
  assert.equals(determinant(m5), 10); // '[[2,4,2],[3,1,1],[1,2,0]], i.e. 10'
}
