// Exporting Modules
console.log('Exporting Module');

const shippingCost = 10; // private variable scoped ONLY to the module, unless exported
export const cart = [];

// this variable/function is exported and can now be used outside this module so long as it's a top level function and NOT inside a separate code block
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  // use this when exporting only ONE thing from a module -- just export the value itself (can give it any name once imported)
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

//////////////////////// Top-Level await (ES2022) Lesson /////////////////////////////
// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users'); // this will block the module and code execution anywhere this module is being imported
// console.log('Finish fetching users');

//////////////////////// The Module Pattern Lesson /////////////////////////////
