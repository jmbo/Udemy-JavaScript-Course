'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// we can compute property names
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 12 + 10,
  },
  fri: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  sat: {
    open: 0,
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // Before ES6
  //   openingHours: openingHours,

  //   order: function (starterIndex, mainIndex) {
  //     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  //   },

  // ES6 enhanced Object literals

  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//////////////////////// Destructuring Arrays Lesson /////////////////////////////
// // destructuring
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// // OR
// const [x, y, z] = arr;
// console.log(x, y, z);
// // OR
// const [first, second] = restaurant.categories;
// console.log(first, second);

// // switching variables
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);
// //OR
// [main, secondary] = [secondary, main]
// console.log(main, secondary);

// // receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested Destructuring
// const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);          // returns 2 Array[5, 6]
// const [k, , [l, m]] = nested;
// console.log(k, l, m);       // returns 2, 5, 6

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

//////////////////////// Destructuring Objects Lesson /////////////////////////////
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const { name: restaurantName, openingHours: hours, categories: tags } = restaurant
// console.log(restaurantName, hours, tags);

// // Default values -- otherwise if not found, it becomes 'undefined'
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);    // need parenthesis otherwise a code block is assumed
// console.log(a, b);

// // Nested objects
// const { fri: { open: o, close: c } } = openingHours;
// console.log(o, c);

// restaurant.orderDelivery({
//     time: '22:30',
//     address: 'Via del Sole, 21',
//     mainIndex: 2,
//     starterIndex: 2,
// })
// restaurant.orderDelivery({
//     address: 'Via del Sole, 21',
//     starterIndex: 1,
// })

//////////////////////// The Spread Operator (...) Lesson /////////////////////////////
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);
// // OR
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // create shallow copy of array
// const mainMenuCopy = [...restaurant.mainMenu];
// // join 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// // Iterables: arrays, strings, maps, sets. NOT objects
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);
// // console.log(`${...str} Schmedtmann`); // does NOT work... not expecting a comma separated values

// const ingredients = [
//   //   prompt("Let's make pasta! Ingredient 1?"),
//   //   prompt('Ingredient 2?'),
//   //   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// //OR
// restaurant.orderPasta(...ingredients);

// // Objects
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

//////////////////////// Rest Pattern and Parameters Lesson /////////////////////////////
// // 1) Destructuring
// // SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) Functions
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };
// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

//////////////////////// Short Circuiting (&& and ||) Lesson /////////////////////////////
// // Use ANY data type, return ANY data type, short-circuiting (if first value is truthy, it will return that value)
// console.log('------- OR -------'); // returns first truthy value

// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);
// console.log(undefined || null || '' || 'Hello' || 23 || 0);

// // restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);
// // OR
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);
// // ** this doesn't quite work for an edge case where numGuests is actually 0 (falsy)

// console.log('------- AND -------'); // returns first falsy value
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');
// console.log('Hello' && 23 && null && 'jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }
// // OR
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//////////////////////// The Nullish Coalescing Operator (??) Lesson /////////////////////////////
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // Nullish values: null and undefined (NOT 0 or '')
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

//////////////////////// Logical Assignment Operators Lesson /////////////////////////////
// const rest1 = {
//   name: 'Capri',
//   numGuests: 20,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;
// // OR
// // rest1.numGuests ||= 10;
// // rest2.numGuests ||= 10;
// // OR
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // rest1.owner = rest1.owner && '<ANONYMOUS>';
// // rest2.owner = rest2.owner && '<ANONYMOUS>';
// //OR
// rest1.owner &&= '<ANONYMOUS>'; // much better option
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

//////////////////////// Challenge #1 Lesson /////////////////////////////
/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      let score = 0;
      for (let j = 0; j < this.scored.length; j++) {
        if (player === this.scored[j]) score += 1;
      }
      console.log(`${player} scored ${score} goals!`);
    }
  },
};

// //1
// const [players1, players2] = game.players;
// //2
// const [gk, ...fieldPlayers] = players1;
// //3
// const allPlayers = [...players1, ...players2];
// //4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// //5
// const { team1c, x: drawc, team2c } = game.odds;
// //OR
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// //6
// game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// game.printGoals(...game.scored);
// //7
// team1 < team2 && console.log(`${game.team1} is more likely to win`);
// team2 < team1 && console.log(`${game.team2} is more likely to win`);

//////////////////////// Looping Arrays: The for-of Loop Lesson /////////////////////////////
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
//   //   console.log(item);
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }
// // OR
// for (const [i, el] of menu.entries()) {
//   //   console.log(item);
//   console.log(`${i + 1}: ${el}`);
// }
// console.log(menu.entries()); // returns an Array iterator
// console.log([...menu.entries()]);

//////////////////////// Enhanced Object Literals Lesson /////////////////////////////

//////////////////////// Optional Chaining (?.) Lesson /////////////////////////////
// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open);

// // WITH optional chaining
// console.log(restaurant.openingHours?.mon?.open);

// for (const day of weekdays) {
//   //   console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// console.log(users[0]?.name ?? 'User array empty');

//////////////////////// Looping Objects: Object Keys, Values, and Entries Lesson /////////////////////////////
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;
// for (const day of Object.keys(openingHours)) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Entries object
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

//////////////////////// Challenge #2 Lesson /////////////////////////////
/*
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// //1
// let goal = 1;
// for (const player of game.scored) {
//   console.log(`Goal ${goal}: ${player}`);
//   goal += 1;
// }
// // OR
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${player}`);
// }
// //2
// let sum = 0;
// for (const [_, x] of Object.entries(game.odds)) {
//   sum += x;
// }
// console.log(`Average odds is ${sum / Object.entries(game.odds).length}`);
// // OR
// const odds = Object.values(game.odds);
// let average = 0;
// for (const odd of odds) average += odd;
// average /= odds.length;
// console.log(average);

// //3
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }
// //BONUS
// const scorers = {};
// for (const player of game.scored) {
//   const goals = scorers[player] ?? 0;
//   scorers[player] = goals + 1;
//   // OR
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

//////////////////////// Sets Lesson /////////////////////////////
// // a collection of unique values
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet);
// console.log(new Set('Jonas'));
// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// // ordersSet.clear();
// console.log(ordersSet);

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// console.log(new Set('jonasschmedtmann').size);

//////////////////////// New Operations to Make Sets Useful Lesson /////////////////////////////
// // in ES2025, sets got a couple more methods
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference

// const commonFoods = italianFoods.intersection(mexicanFoods);
// console.log('Intersection:', commonFoods);
// console.log(`${[...commonFoods]}`);

// const italianMexicanFusion = italianFoods.union(mexicanFoods);
// console.log('Union:', italianMexicanFusion);

// console.log([...new Set([...italianFoods, ...mexicanFoods])]); // not very useful, we can use union

// const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
// console.log('Difference Italian', uniqueItalianFoods);
// const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
// console.log('Difference Mexican', uniqueMexicanFoods);

// const uniqueItalianAndMexicanFoods =
//   italianFoods.symmetricDifference(mexicanFoods);
// console.log(uniqueItalianAndMexicanFoods);

// console.log(italianFoods.isDisjointFrom(mexicanFoods));

//////////////////////// Maps: Fundamentals Lesson /////////////////////////////
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close, 23')
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// console.log(rest.get('name'));
// console.log(rest.get(true)); // exact type matters -- 'true' would not work

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2); // also found in Object properties -- but very slow so usage not recommended
// // rest.clear();
// rest.set([1, 2], 'Test');
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);
// console.log(rest.size);

// console.log(rest.get([1, 2])); // does NOT work since arrays are different heap objects

// const arr = [1, 3];
// rest.set(arr, 'Test');
// console.log(rest.get(arr));

//////////////////////// Maps: Iteration Lesson /////////////////////////////
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct! 🎉'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// //convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key} ${value}`);
// }
// const answer = Number(prompt('Your answer'));
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));

// // convert map to array
// console.log([...question]);
// console.log(question.entries()); // same as above, but gives an iterator so need to convert to Array
// console.log([...question.keys()]);
// console.log(question.values());

//////////////////////// Summary: Which Data Structure to Use Lesson /////////////////////////////

//////////////////////// Challenge #3 Lesson /////////////////////////////
/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// //1
// const events = [...new Set(gameEvents.values())];
// console.log(events);
// //2
// gameEvents.delete(64);
// //3
// let sum = 0;
// for (const el of gameEvents.keys()) sum += el;
// console.log(
//   `An event happened, on average, every ${Math.ceil(sum / 90)} minutes`
// );
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );
// const time = [...gameEvents.keys()].pop();
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// //4
// // for (const [min, evnt] of gameEvents.entries()) {
// for (const [min, evnt] of gameEvents) {
//   min <= 45
//     ? console.log(`[FIRST HALF] ${min}: ${evnt}`)
//     : console.log(`[SECOND HALF] ${min}: ${evnt}`);
// }

//////////////////////// Working with Strings - Part 1 Lesson /////////////////////////////
const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// console.log(airline.length); // 16
// console.log('B737'.length); // 4

// console.log(airline.indexOf('r')); // 6
// console.log(airline.lastIndexOf('r')); // 10
// console.log(airline.indexOf('Portugal')); // 8
// console.log(airline.indexOf('portugal')); // case sensitive -- -1

// console.log(airline.slice(4)); // 'Air Portugal'
// console.log(airline.slice(4, 7)); // 'Air' -- length = 7 - 4 = 3
// console.log(airline.slice(0, airline.indexOf(' '))); // 'TAP'
// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'

// console.log(airline.slice(-2)); // 'al';
// console.log(airline.slice(1, -1)); // 'AP Air Portuga';

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') console.log('You got the middle seat 🙃');
//   else console.log('You got lucky 😎');
// };
// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// // JS Boxing = takes a primitive such as a string and converts it into an object/array
// // to perform these "complex" functions on

// console.log(typeof new String('jonas')); // object functions return a string primitive
// console.log(typeof new String('jonas').slice(1)); // object functions return a string primitive

//////////////////////// Working with Strings - Part 2 Lesson /////////////////////////////
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in name
// const passenger = 'jOnAS'; // Jonas
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// // Comparing email
// const email = 'hello@jonas.io';
// const loginEmail = '   Hello@Jonas.Io  \n';

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim();
// // console.log(trimmedEmail);

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // replacing
// const priceGB = '288,97£';
// const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';
// console.log(announcement.replace('door', 'gate')); // replaces only first occurrence
// console.log(announcement.replaceAll('door', 'gate')); // replaces only first occurrence
// console.log(announcement.replace(/door/g, 'gate')); // uses regex

// // Booleans
// const plane = 'Airbus A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.includes('Boeing'));
// console.log(plane.startsWith('Air'));

// if (plane.startsWith('Airbus') && plane.endsWith('neo'))
//   console.log('Part of the NEW Airbus family');

// // Practice Exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes('knife') || baggage.includes('gun'))
//     console.log('You are NOT allowed on board');
//   else console.log('Welcome aboard!');
// };
// checkBaggage('I have a laptop, some food, and a pocket Knife');
// checkBaggage('I have socks and a camera');
// checkBaggage('I got some snacks and a gun for protection');

//////////////////////// Working with Strings - Part 3 Lesson /////////////////////////////
// split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(23527836));
console.log(maskCreditCard(4323423425235235));
console.log(maskCreditCard('23452532523423423423425'));

// Repeat
const message2 = 'Bad weather... All Departures Delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`Thre are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

// search for something like 'mdn string replace'

//////////////////////// Challenge #4 Lesson /////////////////////////////
/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const str = document.querySelector('textarea').value;
  //   const lines = str.split('\n');
  for (const [i, variable] of str.split('\n').entries()) {
    const str2 = variable.toLowerCase().trim().split('_');
    str2[1] = str2[1].replace(str2[1][0], str2[1][0].toUpperCase());
    console.log(str2.join('').padEnd(21, ' '), '✅'.repeat(i + 1));
  }
});

//////////////////////// String Methods Practice Lesson /////////////////////////////
/* covert flights gibberish string to the following format:

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
*/

for (const flight of flights.split('+')) {
  let outStr = '';

  const flightInfo = flight.split(';');

  let status = flightInfo[0].replace('_', ' ');
  if (status.includes('Delayed')) status = '🔴' + status;

  const src = flightInfo[1].slice(0, 3).toUpperCase();
  const dst = flightInfo[2].slice(0, 3).toUpperCase();
  const duration = flightInfo[3].replace(':', 'h');

  outStr = `${status} from ${src} to ${dst} (${duration})`;
  console.log(outStr.padStart(80));
}
// OR
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}
