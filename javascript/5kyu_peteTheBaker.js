const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function cakes(recipe, available) {
  if (Object.keys(recipe).length > Object.keys(available).length) return 0;

  let possibleCakes = [];

  for (let ingredient in recipe) {
    if (~~(available[ingredient] / recipe[ingredient]) < 1) return 0;

    possibleCakes.push(~~(available[ingredient] / recipe[ingredient]));
  }

  return Math.min(...possibleCakes);
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  let recipe = { flour: 500, sugar: 200, eggs: 1 };
  let available = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 };
  assert.equals(cakes(recipe, available), 2);

  recipe = { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 };
  available = { sugar: 500, flour: 2000, milk: 2000 };
  assert.equals(cakes(recipe, available), 0);
}
