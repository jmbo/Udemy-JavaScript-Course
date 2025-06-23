'use strict';

//////////////////////// Default Parameters Lesson /////////////////////////////
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers // params can be expression of other params so long as it's after it's defined
// ) {
//   // ES5
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// // createBooking('LH123', ,1000);  // this doesn't work
// createBooking('LH123', undefined, 1000);

// //////////////////////// How Passing Arguments Works: Value vs. Reference Lesson /////////////////////////////
// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 2723732525,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 2723732525) {
//     alert('Checked In');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// // the above is the same as doing:
// // const flightNum = flight; // this is a copy of the original value b/c it's a primitive
// // const passenger = jonas; // this copies only the reference type of the object in memory heap

// // console.log(flight); // does not change inside the function
// // console.log(jonas); // this changes inside the function since the object memory reference was touched

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };
// newPassport(jonas); // this is now changing the passport number
// checkIn(flight, jonas);

// // Passing by Value vs. Passing by Reference
// // *** JS does not pass by reference, only by value -- objects still pass by value (a memory address value)

//////////////////////// First-Class and Higher-Order Functions Lesson /////////////////////////////
//////////////////////// Functions Accepting Callback Functions Lesson /////////////////////////////
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // JS uses callbacks all the time
// const high5 = function () {
//   console.log('👋');
// };
// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5); // calls high5 3 times

//////////////////////// Functions Returning Functions Lesson /////////////////////////////
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// // challenge same as above using Arrow functions
// const greet = greeting => name => console.log(`${greeting} ${name}`);

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');
// // This works because of closure...(later lessons)

// greet('Hello')('Jonas');

//////////////////////// The call and apply Methods Lesson /////////////////////////////
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],

//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;
// // does NOT work
// // book(23, 'Sarah Williams');

// // Call Method
// book.call(eurowings, 23, 'Sarah Williams'); // allows us to set this keyword explicitly
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };
// book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);

// // Apply method
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData); // not used often anymore, instead use spread operator
// console.log(swiss);

// book.call(swiss, ...flightData);

// //////////////////////// The bind Method Lesson /////////////////////////////
// // const book = lufthansa.book;
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Steven Williams');

// // specify more than just the 'this' keyword
// const bookEW23 = book.bind(eurowings, 23); // common pattern: partial application
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// // with Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // if you don't bind here, this will point to query selector 'buy' object

// // Partial Application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// // addVAT = value => value + value * 0.23;
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));
// console.log(addVAT(23));

// // Challenge: do same as bind but by return of a function
// const addVAT2 = value => addTax(0.23, value);
// console.log(addVAT2(100));

// // OR
// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT3 = addTaxRate(0.23);
// console.log(addVAT3(100));

//////////////////////// CHALLENGE #1 /////////////////////////////
/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),

//   registerNewAnswer() {
//     // Get answer
//     const ans = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     // Register answer
//     if (typeof ans === 'number' && ans >= 0 && ans < this.answers.length) {
//       this.answers[ans]++;
//     } else {
//       console.log('Answer not recorded. Invalid response.');
//     }
//     // OR
//     // typeof answer === 'number' &&
//     //   ans >= 0 &&
//     //   ans < this.answers.length &&
//     //   this.answers[ans]++;

//     this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const arr1 = {
//   answers: [5, 2, 3],
// };
// poll.displayResults.call(arr1);
// poll.displayResults.call(arr1, 'array');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

//////////////////////// Immediately Invoked Function Expressions (IIFE) Lesson /////////////////////////////
// const runOnce = function () {
//   console.log('This will never run again');
// };
// runOnce();

// // IIFE -- this is a development pattern to create private properties -- more or a legacy pattern for
// // that purpose. now we can just create statement scope blocks {}
// (function () {
//   console.log('This will never run again');
//   const isPrivate = 23; // all this data is encapsulated or private which is good for OOP
// })();

// // console.log(isPrivate);

// (() => console.log('This will ALSO never run again'))();

// {
//   const isPrivate = 23;
//   var notPrivate = 46;
// }
// // console.log(isPrivate);
// console.log(notPrivate);

//////////////////////// Closures Lesson /////////////////////////////
// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// booker(); // this is possible because of the returned function being stored in heap memory
// booker();
// booker();

// console.dir(booker);
//////////////////////// More Closure Examples Lesson /////////////////////////////
// // Example 1
// let f;
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f(); // closed over the a variable so it will have access to it
// console.dir(f);

// // re-assigning f function
// h();
// f();
// console.dir(f);

// // Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 1000; // not used since the boardPassengers scope still exists for setTimeout
// boardPassengers(180, 3);

//////////////////////// CHALLENGE #2 /////////////////////////////
/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
