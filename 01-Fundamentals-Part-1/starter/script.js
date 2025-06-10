// //////////////////////// Values and Variables /////////////////////////////
// let js = 'amazing';
// console.log(40 + 8 + 23 - 10);
// // if (js === 'amazing') alert('JavaScript is FUN!');

// // 40 + 8 + 23 - 10
// // console.log(40 + 8 + 23 - 10);


// // Values
// 'Jose'
// 23

// // Variables
// // camelCase by convention in JavaScript world
// let firstName = "Jose"
// console.log(firstName);

// // constants
// const PI = 3.1415;
// console.log(PI)

// // reserved keywords:
// // new, function, name (depends) ...


// ///// Assignment
// let country = 'USA';
// let continent = 'North America';
// let population = 350000000;

// console.log(country);
// console.log(continent);
// console.log(population);

// //////////////////////// Data Types /////////////////////////////
// // Values: Objects or Primitives
// // JS = dynamic typing
// // Primitive Types: number (always a floating point number), string, boolean (true/false), Undefined (empty value), Null (empty value), Symbol (ES2015) (value cannot be changed), BigInt (ES2020)

// // single line comment
// /*
// multi line comment
// */

// console.log(typeof true);
// console.log(typeof 'Jose');
// console.log(typeof 23);

// let javascriptIsFun = true;
// console.log(javascriptIsFun);
// console.log(typeof javascriptIsFun);
// javascriptIsFun = 'YES!'
// console.log(typeof javascriptIsFun);

// let year;
// console.log(year);
// console.log(typeof year);
// year = 1991;
// console.log(typeof year);

// console.log(typeof null);

// ///// Assignment
// let isIsland = false;
// let language;

// console.log(typeof isIsland);
// console.log(typeof population);
// console.log(typeof country);
// console.log(typeof language);

// //////////////////////// let, const, var /////////////////////////////
// // let : variables that can mutate or be reassigned
// // const : values that cannot change -- must be initialized
// // var : legacy way of defining variables (similar to let)

// // omitting a declaration of let, const, var is bad as the variable will be created with a global scope


// ///// Assignment
// language = 'English';

// //////////////////////// Basic Operators /////////////////////////////
// // arithmetic operators: - * / ** +
// // concatenate strings with: +
// // type of: typeof
// // assignment: =
// // combination: += -= *= ++ --
// // comparison: > < >= <=

// ///// Assignment
// const halfPopulation = population / 2;
// console.log(population + 1);
// const finlandPopulation = 6000000;
// const averagePopulation = 33000000;
// const moreThanFinland = population > finlandPopulation;
// const description = country + ' is in ' + continent + ', and its ' + population + ' people speak ' + language;
// console.log(description);

// //////////////////////// Operator Precedence /////////////////////////////
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

// let x, y;
// x = y = 25 - 10 - 5;
// console.log(x, y);


// //////////////////////// CODING CHALLENGE #1 /////////////////////////////
// /*
// Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / (height * height) (mass in kg and height in meters).

// Your task is to write some code to help them:

// Store Mark's and John's mass and height in variables called massMark, heightMark, massJohn and heightJohn.

// Calculate both their BMIs using the formula, and store the results in two variables called BMIMark and BMIJohn.

// Log the value of BMIMark and BMIJohn to the console.

// BONUS: Create a boolean variable markHigherBMI containing information about whether Mark has a higher BMI than John. Log it to the console too

// TEST DATA 1: Marks weighs 78 kg and is 1.69 m tall. John weighs 92 kg and is 1.95 m tall.

// TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

// IMPORTANT: The ** operator is not supported in this editor. Please make sure to use exactly this formula mass / (height * height), and not this one mass / (height ** 2).
// */

// /* Write your code below. Good luck! 🙂 */

// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMIMark = massMark / (heightMark ** 2);
// const BMIJohn = massJohn / (heightJohn * heightJohn);
// console.log(BMIMark);
// console.log(BMIJohn);

// const markHigherBMI = BMIMark > BMIJohn;
// console.log(BMIMark, BMIJohn, markHigherBMI);

// //////////////////////// Strings and Template Literals /////////////////////////////
// const firstName = 'Jose';
// const job = 'engineer';
// const birthYear = 1995;
// const year = 2037;

// // type coercion (JS converts int into str)
// const jose = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!';
// console.log(jose);

// // template literal
// const joseNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
// console.log(joseNew);

// console.log(`Just a regular string...`);

// // multi line strings
// console.log('String with \n\
// multiple \n\
// lines'); // legacy

// console.log(`String
// multiple
// lines`); // with template literals

// //////////////////////// Taking Decisions: if/else Statements /////////////////////////////
// const age = 19;
// // const isOldEnough = age >= 18;

// // if/else control structure
// // if (isOldEnough) {
// if (age >= 18) {
//     console.log('Sarah can start driving license 🚗');
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
// }

// const birthYear = 1991;
// // variable that's defined inside a code block does not have a reach outside the block
// let century;

// if (birthYear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }
// console.log(century);

// //////////////////////// CODING CHALLENGE #2 /////////////////////////////
// /*
// Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

// 1. Print a nice output to the console, telling the user who has the higher BMI. The message can be either:

// "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!".

// 2. Modify the outputs above to use template literals to include the BMI values in the outputs.

// Example: "Mark's BMI (28.3) is higher than John's (23.9)!" or "John's BMI (29.1) is higher than Mark's (27)!".

// Note: Don't round the BMI values. Leave them as they are.

// */
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMIMark = massMark / (heightMark * heightMark);
// const BMIJohn = massJohn / (heightJohn * heightJohn);
// console.log(BMIMark, BMIJohn);

// /* Write your code below. Good luck! 🙂 */
// if (BMIMark > BMIJohn) {
//     console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})`);
// } else {
//     console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})`);
// }

// //////////////////////// Type Conversion and Coercion /////////////////////////////
// // type conversion: we manually convert one type to another
// const inputYear = '1991';
// console.log(Number(inputYear), inputYear);
// console.log(Number(inputYear) + 18);

// console.log(Number('Jose')); // prints NaN (Not a Number)
// console.log(typeof NaN);     // type is number

// console.log(String(23), 23);

// // *** this does not apply to booleans

// // type coercion: JS automatically converts one type to another
// console.log('I am ' + 23 + ' years old');
// console.log('I am ' + '23' + ' years old');
// console.log('I am ' + String(23) + ' years old');
// console.log('23' - '10' - 3); // 10
// console.log('23' + '10' + 3); // 23103
// // '+' coerces to string, '-, /, *' coerces to number

// let n = '1' + 1;
// n = n - 1;
// console.log(n);

// //////////////////////// Truthy and Falsy Values /////////////////////////////
// // 5 falsy values: 0, '', undefined, null, NaN
// console.log(Boolean(0));            // false
// console.log(Boolean(undefined));    // false
// console.log(Boolean('Jose'));       // true
// console.log(Boolean({}));           // true
// console.log(Boolean(''));           // false

// const money = 0;
// if (money) { // this value is converted to a Boolean
//     console.log("Don't spend it all ;)");
// } else {
//     console.log('You should get a job!');
// }

// let height;
// if (height) {
//     console.log('YAY! Height is defined');
// } else {
//     console.log('Height is UNDEFINED!'); // this is a bug when height equals 0
// }

// //////////////////////// Equality Operators: == vs. === /////////////////////////////
// const age = '18';

// // === strict equality operator -- does not perform type coercion (preferred)
// // ==  loose equality operators == performs type coercion

// if (age === 18) console.log('You just became an adult :D (strict)');
// if (age == 18) console.log('You just became an adult :D (loose)');

// const favorite = Number(prompt("What's your favorite number?"));
// console.log(favorite);
// console.log(typeof favorite);

// if (favorite === 23) {
//     console.log('Cool! 23 is an amazing number!')
// } else if (favorite === 7) {
//     console.log('7 is also a cool number');
// } else {
//     console.log('Number is not 23 or 7');
// }

// if (favorite !== 23) console.log('Why not 23?');

//////////////////////// Boolean Logic /////////////////////////////
// AND, OR, & NOT operators
// Truth Tables

// //////////////////////// Logical Operators /////////////////////////////
// const hasDriversLicense = true;
// const hasGoodVision = false;

// console.log(hasDriversLicense && hasGoodVision);  // false
// console.log(hasDriversLicense || hasGoodVision);  // true
// console.log(!hasDriversLicense);                  // false

// // if (hasDriversLicense && hasGoodVision) {
// //     console.log('Sarah is able to drive!');
// // } else {
// //     console.log('Someone else should drive...');
// // }

// const isTired = true;
// console.log(hasDriversLicense || hasGoodVision || isTired);  // true

// if (hasDriversLicense && !isTired) {
//     console.log('Sarah is able to drive!');
// } else {
//     console.log('Someone else should drive...');
// }

// //////////////////////// CODING CHALLENGE #3 /////////////////////////////
// /*
// There are two gymnastics teams: Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!

// Your tasks:

// 1. Calculate the average score for each team, using the test data included below. The average score for Dolphins should be assigned to the scoreDolphins variable, and the average score of Koalas should be assigned to the scoreKoalas variable.

// 2. Compare the team's average scores to determine the winner of the competition, and print to the console:

// "Dolphins win the trophy" if Dolphins win, or

// "Koalas win the trophy" if Koalas win, or

// "Both win the trophy" if their average scores are equal.

// TEST DATA: Dolphins scored 96, 108, and 89. Koalas scored 88, 91, and 110.
// */

// /* Write your code below. Good luck! 🙂 */
// const scoreDolphins = (96 + 108 + 89) / 3;
// const scoreKoalas = (88 + 91 + 110) / 3;

// if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
//     console.log("Dolphins win the trophy 🏆");
// } else if (scoreDolphins < scoreKoalas && scoreKoalas >= 100) {
//     console.log("Koalas win the trophy 🏆");
// } else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100 && scoreKoalas >= 100) {
//     console.log("Both win the trophy!");
// } else {
//     console.log('No one wins the trophy 😭');
// }

// //////////////////////// The switch Statement /////////////////////////////
// const day = 'saturday';

// switch (day) {
//     case 'monday':
//         console.log('Plan course structure');
//         console.log('Go to coding meetup');
//         break;
//     case 'tuesday':
//         console.log('Prepare theory videos');
//         break;
//     case 'wednesday':
//     case 'thursday':
//         console.log('Write code examples');
//         break;
//     case 'friday':
//         console.log('Record videos');
//         break;
//     case 'saturday':
//     case 'sunday':
//         console.log('Enjoy the weekend :D');
//         break;
//     default:
//         console.log('Not a valid day!');
//         break;
// }

// if (day === 'monday') {
//     console.log('Plan course structure');
//     console.log('Go to coding meetup');
// } else if (day === 'tuesday') {
//     console.log('Prepare theory videos');
// } else if (day === 'wednesday' || day === 'thursday') {
//     console.log('Write code examples');
// } else if (day === 'friday') {
//     console.log('Record videos');
// } else if (day === 'saturday' || day === 'sunday') {
//     console.log('Enjoy the weekend :D');
// } else {
//     console.log('Not a valid day!');
// }

// //////////////////////// Statements and Expressions /////////////////////////////
// // expressions : produce a value
// 3 + 4
// 1991
// true && false && !false
// '23 is bigger'

// // template literals only take in expressions
// console.log(`I'm ${2037 - 1991} years old!`);

// // statement block
// if (23 > 10) {
//     // declarations return undefined
//     const str = '23 is bigger';
// }

// //////////////////////// The Conditional (Ternary) Operator /////////////////////////////
// const age = 23;
// age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧');

// const drink = age >= 18 ? 'wine 🍷' : 'water 💧';
// console.log(drink);

// let drink2;
// if (age >= 18) {
//     drink2 = 'wine 🍷';
// } else {
//     drink2 = 'water 💧';
// }
// console.log(drink2);

// console.log(`I like to drink ${drink}`);

//////////////////////// CODING CHALLENGE #4 /////////////////////////////
/*
Steven needs a very simple tip calculator for whenever he goes to eat in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

Your tasks:

Calculate the tip, depending on the bill value. Create a variable called tip for this. It's not allowed to use an if...else statement (if it's easier for you, you can start with an if...else statement, and then try to convert it to a ternary operator).

Print a string to the console containing the bill value, the tip, and the final value (bill + tip).

Example: The bill was 275, the tip was 41.25, and the total value 316.25.

Note: Use the values of the bill and tip variables to construct this string. Don't hard-code them 🙂

TEST DATA: Test with different bill values: 275, 40, and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2

HINT 2: Value X is between 50 and 300, if it's >= 50 && <= 300 😉
*/

const bill = 275;

/* Write your code below. Good luck! 🙂 */
const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.20 * bill;

console.log(`The bill was ${bill}, the tip was ${tip} and the total value ${bill + tip}.`);

