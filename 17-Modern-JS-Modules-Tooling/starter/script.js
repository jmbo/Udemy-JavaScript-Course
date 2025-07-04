//////////////////////// Exporting and Importing in ES6 Modules Lesson /////////////////////////////

// Importing module
console.log('Importing module');

// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // the extension can sometimes be omitted ?? // all import statements are hoisted to the top even when spread around
// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js'; // creates a namespace for all values exported from this module
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add from './shoppingCart.js'; // imports the default export

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // can mix in named and default, but NOT recommended
// console.log(price, tq);

import add, { cart } from './shoppingCart.js'; // imports the default export
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); // this a live copy/connection, not just an simply copy of the empty object

// ** imports are NOT copies of the export, they are a live export pointing to the same place in memory!

//////////////////////// Top-Level await (ES2022) Lesson /////////////////////////////
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // these awaits will block the execution of the module so it can be bad -- use with caution
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost(); // this does not work since we get a promise instead of a value whenever calling an async function!!!
// console.log(lastPost); // this does not work since we get a promise instead of a value whenever calling an async function!!!

// // better way to call it -- not very clean though
// lastPost.then(last => console.log(last));

// // even better way to call it
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

//////////////////////// The Module Pattern Lesson /////////////////////////////
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4); // this works because of closures -- it allows a function to have access to all it's variables and functions when it was created
// ShoppingCart2.addToCart('pizza', 2);

// // cannot view ShoppingCart2 from console since all of it is module scoped and not available externally on the global scope...
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); // undefined -- property not accessible outside the scope

//////////////////////// CommonJS Modules Lesson /////////////////////////////
// // Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

// // Import
// const { addToCart } = require('./shoppingCart.js')

//////////////////////// Introduction to NPM Lesson /////////////////////////////
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash'; // sometimes parcel will automatically install necessary modules too!
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state); // not a deep copy
state.user.loggedIn = false;
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = true;
console.log(stateDeepClone);

//////////////////////// Bundling With Parcel and NPM Scripts Lesson /////////////////////////////
// Hot Module Replacement/Reloading = changes in modules tend to trigger a rebuild, with this, the module is inserted into the browser without an entire page reload allowing us to preserve the current state
if (module.hot) {
  // only parcel understands this, so it will not make it to the browser code
  module.hot.accept();
}
//////////////////////// Configuring Babel and Polyfilling Lesson /////////////////////////////
class Person {
  greeting = 'Hey there';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonass');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2)); // not converted to ES5

Promise.resolve('TEST').then(x => console.log(x));

// import 'core-js/stable';
// import 'core-js/stable/array/find'; // OR to limit what's imported/poly-filled
// import 'core-js/stable/promise';

// import 'regenerator-runtime/runtime';

//////////////////////// Review: Writing Clean and Modern JavaScript Lesson /////////////////////////////

//////////////////////// Let's Fix Some Bad Code: Part 1 Lesson /////////////////////////////
//////////////////////// Declarative and Functional JavaScript Principles Lesson /////////////////////////////
//////////////////////// Let's Fix Some Bad Code: Part 2 Lesson /////////////////////////////
