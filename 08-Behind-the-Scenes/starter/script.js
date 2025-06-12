'use strict';

//////////////////////// Scoping in Practice Lesson /////////////////////////////
// function calcAge(birthYear) {     // defined in the global scope
//     const age = 2037 - birthYear;
//     console.log(firstName);

//     function printAge() {
//         let output = `${firstName}, you are ${age}, born in ${birthYear}`;
//         console.log(output);

//         if (birthYear >= 1981 && birthYear <= 1996) {
//             var millennial = true;
//             // Creates NEW variable with same name as outer scope's variable
//             const firstName = 'Steven';
//             const str = `Oh, and you're a millennial, ${firstName}`;
//             console.log(str);

//             function add(a, b) {
//                 return a + b;
//             }

//             // Reassigns outer scope's variable
//             output = 'NEW OUTPUT!';
//         }
//         // console.log(str);     // ERRORS out -- not defined
//         console.log(millennial); // var variables are not scoped (bad practice to use)
//         // console.log(add(2, 3));  // ERRORS out -- not defined, unless strict is turned OFF
//         console.log(output);
//     }
//     printAge();
//     printAge();

//     return age;
// }

// // global variable
// const firstName = 'Jonas'
// calcAge(1991);
// // console.log(age);   // ERRORS out -- not defined
// // printAge();         // ERRORS out -- not defined

//////////////////////// Hoisting and TDZ in Practice Lesson /////////////////////////////
// // //Variables
// // console.log(me);      // hoisted to undefined value
// // // console.log(job);  // ERROR since it's in the TDZ
// // // console.log(year); // ERROR since it's also in the TDZ

// // var me = 'Jonas';
// // let job = 'teacher';
// // const year = 1991;

// // // Functions
// // console.log(addDecl(2, 3));
// // // console.log(addExpr(2, 3));   // ERROR since var is undefined at hoisting
// // // console.log(addArrow(2, 3));  // ERROR since it's considered a const variable


// // function addDecl(a, b) {
// //     return a + b;
// // }

// // var addExpr = function (a, b) {
// //     return a + b;
// // }

// // const addArrow = (a, b) => a + b;

// // Example
// // inserts BUG since numProducts is considered undefined when hoisting and this will execute
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//     console.log('All products deleted!');
// }

// var x = 1;
// let y = 2
// const z = 3;

// console.log(x === window.x);  // true
// console.log(y === window.y);  // false
// console.log(z === window.z);  // false

//////////////////////// The this Keyword Practice Lesson /////////////////////////////
// console.log(this); // window object

// const calcAge = function (birthYear) {
//     console.log(2037 - birthYear);
//     console.log(this);  // undefined -- but only on strict mode, otherwise it defaults to window object again
// }

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//     console.log(2037 - birthYear);
//     console.log(this);  // window object because ArrowFunc uses lexical this keyword (the one from the parent scope)
// }
// calcAgeArrow(1980);

// const jonas = {
//     year: 1991,
//     calcAge: function () {
//         console.log(this); // the that's calling the function 'jonas' or 'matilda' below
//         console.log(2037 - this.year);
//     }
// };
// jonas.calcAge();

// const matilda = {
//     year: 2017,
// };
// matilda.calcAge = jonas.calcAge;
// matilda.calcAge();

// const f = jonas.calcAge;
// f();  // ERRORS out because this is now undefined


//////////////////////// Regular Functions vs. Arrow Functions Lesson /////////////////////////////

// var firstName = 'Matilda'; // creates a property on the global object -- ANOTHER REASON var is BAD

// const jonas = {
//     firstName: 'Jonas',
//     year: 1991,
//     calcAge: function () {
//         console.log(this); // the that's calling the function 'jonas' or 'matilda' below
//         console.log(2037 - this.year);

//         // Solution 1
//         // const self = this;   // self or that
//         // const isMillennial = function () {
//         //     // console.log(this.year >= 1981 && this.year <= 1996); //this is undefined since it's from a regular function/method call
//         //     console.log(self.year >= 1981 && self.year <= 1996); //this is undefined since it's from a regular function/method call
//         // };

//         // Solution 2  -- works better with arrow function since it passes the this keyword from the parent object
//         const isMillennial = () => {
//             console.log(this.year >= 1981 && this.year <= 1996); //this is undefined since it's from a regular function/method call
//         };


//         isMillennial(); //if we want to populate 'this' we'd have to call it like jonas.isMillennial()
//     },

//     greet: () => console.log(`Hey ${this.firstName}`)  // Arrow functions do not get their own `this` keyword, they use their surroundings
// };
// jonas.greet(); // get's global function which in this case is the window object
// jonas.calcAge();


// const addExpr = function (a, b) {
//     console.log(arguments);
//     return a + b;
// }
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);


// const addArrow = (a, b) => {
//     console.log(arguments);   // arguments not defined in Arrow functions
//     return a + b;
// }
// addArrow(2, 5, 8);

//////////////////////// Object References in Practice (Shallow vs. Deep Copies) Lesson /////////////////////////////
const jessica1 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

// const marriedJessica = jessica1;
// marriedJessica.lastName = 'Davis';

function marryPerson(originalPerson, newLastName) {
    originalPerson.lastName = newLastName;
    return originalPerson;
}
const marriedJessica = marryPerson(jessica1, 'Davis');

console.log('Before: ', jessica1);
console.log('After: ', marriedJessica);  // both Objects are the same because of references

const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob'],
};

// // Shallow Copy
// const jessicaCopy = { ...jessica2 } // spread operator creates a new brand object with copied properties -- a shallow copy
// jessicaCopy.lastName = 'Davis';

// console.log('Before: ', jessica2);
// console.log('After: ', jessicaCopy);  // both Objects are now different because of the spread above

// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// console.log('Before: ', jessica2);
// console.log('After: ', jessicaCopy);  // both Objects are still the same because of nested object references and shallow copies

// Deep Copy/Clone
const jessicaClone = structuredClone(jessica2);

jessicaClone.family.push('Mary');
jessicaClone.family.push('John');

console.log('Before Clone: ', jessica2);
console.log('After Clone: ', jessicaClone);  // both Objects are now different because of Deep Copies

