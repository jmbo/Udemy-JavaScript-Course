'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDate = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDate);

  //   const movs = sort
  //     ? acc.movements.slice().sort((a, b) => a - b)
  //     : acc.movements;

  if (sort) combinedMovsDate.sort((a, b) => a.movement - b.movement);

  combinedMovsDate.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', // '2-digit', 'numeric'
      year: 'numeric', // '2-digit'
      weekday: 'long', // 'short', 'narrow'
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const user = inputCloseUsername.value;
  const pin = +inputClosePin.value;
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

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );
  console.log(movementsUI);

  // OR
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//////////////////////// Converting and Checking Numbers Lesson /////////////////////////////
// console.log(23 === 23.0);

// // Base 10 -- 0 to 9  -- 1/10 = 0.1, 3/10 = 3.33333....
// // Binary base2 -- 0 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3); // will return false because of inaccuracies -- 0.300000000000004 == 0.3

// // Conversion
// console.log('23');
// console.log(Number('23'));
// console.log(+'23');

// // Parsing
// console.log(Number.parseInt('30px')); // for it to work, it has to start with a number
// console.log(Number.parseInt('e23', 10)); // does NOT work

// console.log(Number.parseInt('  2.5rem')); // these functions are also global, but generally should call as part of its namespace
// console.log(Number.parseFloat('2.5rem'));
// // console.log(parseFloat('  3.3.rax')); // old JS way of calling these -- discouraged

// // Check if value is NaN (in practice -- rarely used)
// console.log(Number.isNaN(20)); // false
// console.log(Number.isNaN('20')); // false
// console.log(Number.isNaN(+'20X')); // true
// console.log(Number.isNaN(23 / 0)); // false -- this is a special value of 'Infinity'

// // Check if a value is a "real" number (not a string)
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite(23 / 0)); // false
// console.log(Number.isFinite('20')); // false

// console.log(Number.isInteger(23)); // true
// console.log(Number.isInteger(23.0)); // true
// console.log(Number.isInteger('20')); // false

//////////////////////// Math and Rounding Lesson /////////////////////////////
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(5, 18, 23, 11, 2)); // 23
// console.log(Math.max(5, 18, '23', 11, 2)); // 23
// console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

// console.log(Math.min(5, 18, 23, 11, 2)); // 2

// console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.14926... - Area of circle with this radius

// console.log(Math.trunc(Math.random() * 6) + 1); // random values between 1 and 6

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// console.log(randomInt(10, 20));
// console.log(randomInt(0, 3));

// // Rounding integers
// console.log(Math.trunc(23.3)); // 23

// console.log(Math.round(23.3)); // 23
// console.log(Math.round(23.9)); // 24

// console.log(Math.ceil(23.3)); // 24
// console.log(Math.ceil(23.9)); // 24

// console.log(Math.floor(23.3)); // 23
// console.log(Math.floor(23.9)); // 23

// // floor and trunc are similar for positive #'s, but not the same for negative #'s
// console.log(Math.trunc(-23.3)); // -23
// console.log(Math.floor(-23.3)); // -24

// // Rounding decimals
// console.log((2.7).toFixed(0)); // '3' - always returns a string -- JS is doing boxing behind the scenes for this primitive value
// console.log((2.7).toFixed(3)); // '2.700'
// console.log((2.345).toFixed(2)); // '2.35'
// console.log(+(2.345).toFixed(2)); // 2.35

//////////////////////// The Remainder Operator Lesson /////////////////////////////
// console.log(5 % 2); // 1
// console.log(5 / 2); // 2.5 -- 5 = 2 * 2 + 1
// console.log(8 % 3); // 2
// console.log(8 / 3); // 2.66666...5 -- 8 = 2 * 3 + 2

// console.log(6 % 2); // 0
// console.log(6 / 2); // 3

// console.log(7 % 2); // 1
// console.log(7 / 2); // 3.5

// const isEvent = n => n % 2 === 0;
// console.log(isEvent(8)); // true
// console.log(isEvent(23)); // false
// console.log(isEvent(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//////////////////////// Numeric Separators Lesson /////////////////////////////
// const diameter = 287_460_000_000; // 287,460,000,000
// console.log(diameter); // 287460000000

// const priceCents = 356_99;
// console.log(priceCents); // 35699

// const transferFee1 = 15_00;
// const transferFee2 = 1_500;

// const PI = 3.14_15; // can only be place between numbers -- NOT ALLOWED: _3.1415, 3._1415, 3_.1415, 3.1415_, 3.14__15
// console.log(PI);

// console.log(Number('230_000')); // NaN
// console.log(Number.parseInt('230_000')); // 230

//////////////////////// Working with BigInt Lesson /////////////////////////////
// console.log(2 ** 53 - 1); // biggest number JS can safely represent 64 bits (only 53 are used for the number, the rest is for decimal points and sign)
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1); // not accurate -- start losing precision
// console.log(2 ** 53 + 0); // not accurate

// console.log(623423523969675295977692796729572967927692n); // BigInt number
// console.log(BigInt(62342352396)); // still need to pass a SAFE_INTEGER value

// // Operations
// console.log(10000n + 10000n);
// console.log(2452354234233262432342634436436436n * 10000000n);
// // console.log(Math.sqrt(16n)); // error

// const huge = 32235259723459873495793475934n;
// const num = 23;
// // console.log(huge * num); // error
// console.log(huge * BigInt(num));

// // Exceptions
// console.log(20n > 15); // true
// console.log(20n === 20); // false -- no type coercion
// console.log(typeof 20n); // bigint
// console.log(20n == '20'); // true -- does type coercion

// console.log(huge + ' is REALLY big!!!');

// // Divisions
// console.log(11n / 3n); // 3n -- cuts decimal part of
// console.log(11 / 3); // 3.66666666...5

//////////////////////// Creating Dates Lesson /////////////////////////////
// // Create a date
// const now = new Date();
// console.log(now);

// console.log(new Date('Jun 25 2025 13:22:34'));
// console.log(new Date('December 24, 2015')); // unreliable -- avoid this

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5)); // month 10 = Nov (zero based)
// console.log(new Date(2037, 10, 33)); // Dec 3rd day since Nov only has 30 days

// console.log(new Date(0)); // UNIX EPOCH Time
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days later after UNIX EPOCH Time -- created with a timestamp

// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); // 2037
// console.log(future.getMonth()); // 10
// console.log(future.getDate()); // 19
// console.log(future.getDay()); // 4
// console.log(future.getHours()); // 15
// console.log(future.getMinutes()); // 23
// console.log(future.getSeconds()); // 0
// console.log(future.toISOString()); //2037-11-19T20:23:00.000Z
// console.log(future.getTime()); // 2142274980000

// console.log(new Date(2142274980000));
// console.log(Date.now()); // current timestamp

// future.setFullYear(2040);
// console.log(future);

//////////////////////// Adding Dates to "Bankist" App Lesson /////////////////////////////
// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

//////////////////////// Fixing and Sorting Bug Lesson /////////////////////////////
//////////////////////// Operations with Dates Lesson /////////////////////////////
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(+future); // convert to Number -- timestamp

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
// console.log(days1);

function formatMovementDate(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  //   console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${month}/${day}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

//////////////////////// Internationalizing Dates (Intl) Lesson /////////////////////////////
// Experimenting API
// const now = new Date();
// // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long', // '2-digit', 'numeric'
//   year: 'numeric', // '2-digit'
//   weekday: 'long', // 'short', 'narrow'
// };
// const locale = navigator.language;
// console.log(locale);

// // labelDate.textContent = new Intl.DateTimeFormat('ar-SY').format(now);
// // labelDate.textContent = new Intl.DateTimeFormat('pt-PT', options).format(now);
// // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// http://www.lingoes.net/en/translator/langcode.htm
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

//////////////////////// Internationalizing Numbers (Intl) Lesson /////////////////////////////
// const num = 3884764.23;

// const options = {
//   style: 'currency', //'percent', //'unit',
//   unit: 'celsius', //'mile-per-hour',
//   currency: 'EUR',
//   //   useGrouping: false,
// };
// console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(
//   'Browser: ',
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

function formatCur(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

//////////////////////// Timers: setTimeout and setInterval Lesson /////////////////////////////
// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...'); // this still executes while time counts down in the background -- asynchronous JS
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 3000);

//////////////////////// Implementing a Countdown Timer Lesson /////////////////////////////
function startLogOutTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

// Start timer
if (timer) clearInterval(timer);
timer = startLogOutTimer();

// Reset timer
clearInterval(timer);
timer = startLogOutTimer();
