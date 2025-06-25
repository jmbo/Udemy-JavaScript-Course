'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//////////////////////// Simple Array Methods Lesson /////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // creates a shallow copy
// console.log([...arr]);

// // SPLICE -- mutates original array
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// // console.log(arr.splice(2));
// arr.splice(-1); // removes last element
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE -- mutates original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

// //previously learned -- push, pop, unshift, etc.

//////////////////////// The New at Method Lesson /////////////////////////////
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting the last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1)); // also good for method chaining

// console.log('jonas'.at(-1));

//////////////////////// Looping Arrays: forEach Lesson /////////////////////////////
// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('-----FOREACH------');
// // movements.forEach(function (mov, i, arr) {
// // cannot break out of the loop with this
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });
// // 0: function(200)
// // 1: function(450)
// // 2: function(400)
// // ...

//////////////////////// forEach with Maps and Sets Lesson /////////////////////////////
// // Map
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// // currenciesUnique.forEach(function (value, key, map) {
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

//////////////////////// PROJECT: "Bankist" App Lesson /////////////////////////////

//////////////////////// Creating DOM Elements Lesson /////////////////////////////
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // similar -- .textContent = 0

  // we create a copy with slice to not modify original
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i, _) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

//////////////////////// CHALLENGE #1 /////////////////////////////
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJulia2 = dogsJulia.slice(1, -2);
//   //OR
//   //   const dogsJuliaCorrected = dogsJulia.slice();
//   //   dogsJuliaCorrected.splice(0, 1);
//   //   dogsJuliaCorrected.splice(-2);

//   const dogs = [...dogsJulia2, ...dogsKate];
//   //OR
//   //   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach(function (val, i, _) {
//     const msg =
//       val >= 3 ? `an adult, and is ${val} years old` : `still a puppy 🐶`;
//     console.log(`Dog number ${i + 1} is ${msg}`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
//////////////////////// Data Transformations: map, filter, reduce Lesson /////////////////////////////

//////////////////////// The map Lesson /////////////////////////////
const eurToUsd = 1.1;

// // this here is more inline with functional programming which is more JS appropriate
const movementsUSD = movements.map(function (mov) {
  // does not mutate original array
  return mov * eurToUsd;
});

// const movementsUSDarr = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementDescriptions = movements.map((mov, i, arr) => {
//   return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`;
// });
// console.log(movementDescriptions);

//////////////////////// Computing Usernames Lesson /////////////////////////////
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
// console.log(accounts);

//////////////////////// The filter Method Lesson /////////////////////////////
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// // console.log(movements);
// // console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// // console.log(withdrawals);

// // const depositsFor = [];
// // for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// // console.log(depositsFor);

//////////////////////// The reduce Method Lesson /////////////////////////////
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

// console.log(movements);

// // accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// }, 0); // this 0 arg is the initial value of the accumulator
// console.log(balance);

// const balanceArr = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balanceArr);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// // Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

//////////////////////// CHALLENGE #2 /////////////////////////////
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAge = function (ages) {
//   return ages
//     .map(function (age) {
//       if (age <= 2) return 2 * age;
//       else return 16 + age * 4;
//     })
//     .filter(age => age >= 18)
//     .reduce((avg, age, i) => (avg * i + age) / (i + 1), 0);
//   // OR
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   // avg of 2 and 3 -- (2+3)/2 == 2.5 === 2/2 + 3/2 == 2.5
//   const average2 = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   return average;
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//////////////////////// The Magic of Chaining Methods Lesson /////////////////////////////
// PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   //   .map((mov, i, arr) => { // can use the arr to troubleshoot and inspect the pipeline
//   //     console.log(arr);
//   //     mov * eurToUsd;
//   //   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //   console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

//////////////////////// CHALLENGE #3 /////////////////////////////
/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAge2 = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((avg, age, i) => (avg * i + age) / (i + 1), 0);
// console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));

//////////////////////// The find Method Lesson /////////////////////////////
// // similar to filter but does not return an array, just the first item
// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//////////////////////// Implementing Login Lesson /////////////////////////////
// Event handler
let currentAccount;

const updateUI = function (currAcc) {
  // Display movements
  displayMovements(currAcc.movements);

  // Display balance
  calcDisplayBalance(currAcc);

  // Display summary
  calcDisplaySummary(currAcc);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});
//////////////////////// Implementing Transfers Lesson /////////////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});
//////////////////////// The findIndex Method Lesson /////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();

  if (currentAccount.username === user && currentAccount.pin === pin) {
    // with findIndex we can create a complex condition unlike .indexOf
    const index = accounts.findIndex(acc => acc.username === user);
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
});
//////////////////////// The New findLast and findLastIndex Methods Lesson /////////////////////////////
// console.log(movements);
// const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log(lastWithdrawal);

// const latestLargeMovementIndex = movements.findLastIndex(
//   mov => Math.abs(mov) > 1000
// );
// console.log(latestLargeMovementIndex);
// console.log(
//   `Your latest large movement was ${
//     movements.length - latestLargeMovementIndex
//   } movements ago`
// );

//////////////////////// some and every Lesson /////////////////////////////
// console.log(movements);

// // checks for EQUALITY
// console.log(movements.includes(-130));

// // SOME: CONDITION -- any item meets the condition
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // EVERY: CONDITION -- all items meet the condition
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Separate callback -- good for the DRY principle
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

//////////////////////// flat and flatMap Lesson /////////////////////////////
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, [[[8]]]];
// console.log(arrDeep.flat(3));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// // flat with chaining
// const overallBalance2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// // flatMap
// const overallBalance3 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance3);

//////////////////////// CHALLENGE #4 /////////////////////////////
/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// // 1
// const huskyWeight = breeds.find(obj => obj.breed === 'Husky').averageWeight;
// console.log(huskyWeight);

// // 2
// const dogBothActivities = breeds.find(
//   obj => obj.activities.includes('running') && obj.activities.includes('fetch')
// ).breed;
// console.log(dogBothActivities);

// // 3
// const allActivities = breeds.flatMap(obj => obj.activities);
// console.log(allActivities);

// // 4
// const uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);

// // 5
// const swimmingAdjacent = [
//   ...new Set(
//     breeds
//       .filter(obj => obj.activities.includes('swimming'))
//       .flatMap(obj => obj.activities)
//   ),
// ];
// swimmingAdjacent.splice(swimmingAdjacent.indexOf('swimming'), 1);
// console.log(swimmingAdjacent);
// // OR
// const swimmingAdjacent2 = [
//   ...new Set(
//     breeds
//       .filter(obj => obj.activities.includes('swimming'))
//       .flatMap(obj => obj.activities)
//       .filter(act => act !== 'swimming')
//   ),
// ];
// console.log(swimmingAdjacent2);

// // 6
// console.log(breeds.every(obj => obj.averageWeight >= 10));

// // 7
// console.log(breeds.some(obj => obj.activities.length >= 3));

// // BONUS
// console.log(
//   Math.max(
//     ...breeds
//       .filter(obj => obj.activities.includes('fetch'))
//       .flatMap(obj => obj.averageWeight)
//   )
// );

//////////////////////// Sorting Arrays Lesson /////////////////////////////
// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // this mutates the original array
// console.log(owners);

// // Numbers
// console.log(movements);
// // console.log(movements.sort()); // sorts based on string hence why not sorted by numbers...

// // return < 0, A, B (keep order)
// // return > 0, B, A (switch order)

// // Ascending
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// //OR
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//////////////////////// Array Grouping Lesson /////////////////////////////
// console.log(movements);

// const groupedMovements = Object.groupBy(movements, movement =>
//   movement > 0 ? 'deposits' : 'withdrawals'
// );
// console.log(groupedMovements);

// const groupedByActivity = Object.groupBy(accounts, account => {
//   const movementCount = account.movements.length;
//   if (movementCount >= 8) return 'very active';
//   if (movementCount >= 5) return 'active';
//   if (movementCount >= 4) return 'moderate';
//   return 'inactive';
// });
// console.log(groupedByActivity);

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
// const groupedAccounts2 = Object.groupBy(accounts, ({ type }) => type);
// console.log(groupedAccounts);
// console.log(groupedAccounts2);

//////////////////////// More Ways of Creating and Filling Arrays Lesson /////////////////////////////
// console.log([1, 2, 3, 4, 5, 6, 7]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty arrays + fill method
// const x = new Array(7); // contains an array with 7 empty items
// console.log(x);
// console.log(x.map(() => 5)); // nothing happens here

// x.fill(0); // mutates original array
// x.fill(1, 3, 5); // mutates original array
// console.log(x);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1); // array like structure converted to an Array using from()
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // OR
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

//////////////////////// Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with Lesson /////////////////////////////
// console.log(movements);
// // const reverseMov = movements.reverse(); // mutates original array
// // const reverseMov = movements.slice().reverse(); // does NOT mutate original array
// const reverseMov = movements.toReversed(); // does NOT mutate original array
// console.log(reverseMov);
// console.log(movements);

// // toSorted (sort), toSpliced (splice)

// // movements[1] = 2000;
// const newMovements = movements.with(1, 2000);
// console.log(newMovements);
// console.log(movements);

//////////////////////// Summary: Which Array Method to Use? Lesson /////////////////////////////
//////////////////////// Array Methods Practice Lesson /////////////////////////////
// // 1
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// // 2
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// console.log(numDeposits1000);

// const numDeposits1000_2 = accounts
//   .flatMap(acc => acc.movements)
//   // count++ does not work here, need to use ++count instead
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000_2);

// // 3
// // const sums = accounts
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       //   cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// // console.log(sums);
// console.log(deposits, withdrawals);

// // 4
// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');

//   return capitalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title, but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//////////////////////// CHALLENGE #5 /////////////////////////////
/*
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2
const [sarahsDog] = dogs.filter(dog => dog.owners.includes('Sarah'));
let eating = '';
if (sarahsDog.curFood > sarahsDog.recFood * (1 + 0.1)) eating = 'too much';
else if (sarahsDog.curFood < sarahsDog.recFood * (1 - 0.1))
  eating = 'too little';
else eating = 'just fine';
console.log(`Sarah's Dog is eating ${eating}`);

// OR
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

// 3
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood * (1 + 0.1))
  .flatMap(dog => dog.owners);
const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood * (1 - 0.1))
  .flatMap(dog => dog.owners);
console.log(ownersTooMuch, ownersTooLittle);

// 4
console.log(`${ownersTooMuch.join(', and ')}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(', and ')}'s dogs eat too little!`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6
const eatingOk = dog =>
  dog.curFood <= dog.recFood * (1 + 0.1) &&
  dog.curFood >= dog.recFood * (1 - 0.1);
console.log(dogs.every(eatingOk));

// 7
const dogsEatingOk = dogs.filter(eatingOk);
console.log(dogsEatingOk);

// 8
const groupedDogsEating = Object.groupBy(dogs, dog => {
  if (dog.curFood > dog.recFood * (1 + 0.1)) return 'too-much';
  else if (dog.curFood < dog.recFood * (1 - 0.1)) return 'too-little';
  else return 'exact';
});
console.log(groupedDogsEating);

// 9
const groupedDogsOwnerAmount = Object.groupBy(dogs, dog => dog.owners.length);
console.log(groupedDogsOwnerAmount);
//OR
const groupedDogsOwnerAmount2 = Object.groupBy(
  dogs,
  dog => `${dog.owners.length}-owners`
);

// 10
console.log(dogs.toSorted((dog1, dog2) => dog1.recFood - dog2.recFood));
console.log(dogs);
