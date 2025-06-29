'use strict';

//////////////////////// Constructor Functions and the new Operator Lesson /////////////////////////////
const Person = function (firstName, birthYear) {
  //   console.log(this); // Person {}
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Instance methods
  // BAD PRACTICE -- never do this -- never create methods inside a construction function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // calls the function with the 'new' operator
// // 1. New {} (empty object) is created
// // 2. function is called, this = {}
// // 3. {} is linked to prototype
// // 4. function automatically returns {} (not longer necessarily empty at this point)

// const matilda = new Person('Matilda', 2017); // JS doesn't call these class instances, but they are instances of the Person Object
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// const jay = 'jay';

// console.log(jonas instanceof Person); // true
// console.log(jay instanceof Person); // false

// //////////////////////// Prototypes Lesson /////////////////////////////
// console.log(Person.prototype); // all objects created from this constructor will inherit everything from the prototype object

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// jonas.calcAge(); // 46 // jonas object contains firstName and birthYear properties, but not the calcAge() method. still available through prototypal inheritance
// matilda.calcAge();
// jack.calcAge();

// console.log(jonas.__proto__); // not the prototype property -- just the prototype that's inherited during step 3 above when the linking happens
// console.log(jonas.__proto__ === Person.prototype); // true
// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(matilda)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false  -- Person.prototype is akin to prototypeOfLinkedObject

// Person.prototype.species = 'Homo Sapiens';

// console.log(jonas, matilda);
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false

// //////////////////////// Prototypal Inheritance and The Prototype Chain Lesson /////////////////////////////
// //////////////////////// Prototypal Inheritance on Built-In Objects Lesson /////////////////////////////
// console.log(jonas.__proto__); // Person
// console.log(jonas.__proto__.__proto__); // Object -- top of prototype chain
// console.log(jonas.__proto__.__proto__.__proto__); // null

// console.log(Person.prototype.constructor); // function Person()

// const arr = [3, 6, 4, 5, 7, 9, 3, 9, 9, 6]; // equivalent to using new Array === []
// console.log(arr.__proto__); // Array
// console.log(arr.__proto__ === Array.prototype); // true
// console.log(arr.__proto__.__proto__); // Object
// // mdn Array.prototype.filter()

// Array.prototype.unique = function () {
//   // extending the prototype of a built-in object is a BAD idea... you can break code with future additions to the language
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// const h1 = document.querySelector('h1'); // prototype -- HTMLHeadingElement -> HTMLElement -> Element -> Node -> EventTarget -> Object

// console.dir(x => x + 1); // prototype -- function [apply(), bind(), call(), ...] -> Object

//////////////////////// CHALLENGE #1 /////////////////////////////
/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.make} car is now driving at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.make} car is now driving at ${this.speed} km/h`);
};

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// car1.accelerate();
// car1.brake();
// car1.brake();
// car1.brake();

// car2.brake();
// car2.brake();
// car2.accelerate();
// car2.brake();

//////////////////////// ES6 Classes Lesson /////////////////////////////
// class expression
// const PersonCl = class {}

// class declaration -- another syntactical way of creating object classes in JS
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  } // NOTICE: no commas between methods
  greet = function () {
    console.log(`Hey ${this.firstName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    // console.log(name);

    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }

  //   static methods
  static hey() {
    console.log('Hey there 👋');
    console.log(this); // entire class object for PersonCl since that the this keyword is pointing to
  }
}

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey ${this.firstName}`);
// // };
// jessica.greet();

// // 1. Classes are NOT hoisted -- unlike function declarations
// // 2. Class are first-class citizens -- we can pass and return them with functions
// // 3. Classes are ALWAYS executed in strict mode (even when not explicitly enabled)

// console.log(jessica.age);

//////////////////////// Setters and Getters Lesson /////////////////////////////
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

// console.log(account.latest); // can just use it as a property without calling it as a method
// account.latest = 50;

// const walter = new PersonCl('Walter White', 1965);

//////////////////////// Static Methods Lesson /////////////////////////////
PersonCl.hey = function () {
  console.log('Hey there 👋');
  console.log(this); // entire construction function for PersonCl which is what's calling this object
};

PersonCl.hey();
//////////////////////// Object.create Lesson /////////////////////////////
const PersonProto = {
  // no new operator, no constructor, no prototype property BUT there is still prototype inheritance
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    // this is not a constructor which is generally called with the 'new' keyword. we must call init() directly
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge(); // this works!

// console.log(steven.__proto__ === PersonProto); // true

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();

//////////////////////// CHALLENGE #2 /////////////////////////////
// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} car is now driving at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} car is now driving at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// const ford = new CarCl('Ford', 120);
// console.log(`Ford Car US Speed: ${ford.speedUS}`);
// ford.accelerate();
// console.log(`Ford Car US Speed: ${ford.speedUS}`);
// ford.brake();
// ford.brake();
// ford.brake();
// console.log(`Ford Car US Speed: ${ford.speedUS}`);
// ford.speedUS = 30;
// console.log(`Ford Car US Speed: ${ford.speedUS}`);

//////////////////////// Inheritance Between "Classes": Constructor Functions Lesson /////////////////////////////
const Student = function (firstName, birthYear, course) {
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype); // need to do this before any other methods are added such as introduce() below. Otherwise Object.create() will overwrite those methods
// Student.prototype = Person.prototype; // this DOES NOT work!!!

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student); // true
// console.log(mike instanceof Person); // true
// console.log(mike instanceof Object); // true

// console.log(Student.prototype.constructor); // points to Person because of Object.create() ... should be Student, which we can fix
// console.dir(Student.prototype.constructor);
// Student.prototype.constructor = Student;

//////////////////////// CHALLENGE #3 /////////////////////////////
// Coding Challenge #3

/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// 1
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);

// 2
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// // 3
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// // 4
// // const car3 = new EV('Tesla', 120, 23);
// // car3.accelerate();
// // car3.brake();
// // car3.accelerate();
// // car3.chargeBattery(90);
// // car3.accelerate();
// // car3.brake();

//////////////////////// Inheritance Between "Classes": ES6 Classes Lesson /////////////////////////////
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // this always needs to happen first!  because this will create the `this` keyword
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();

// //////////////////////// Inheritance Between "Classes": Object.create Lesson /////////////////////////////
// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };
// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();

//////////////////////// Another Class Example Lesson /////////////////////////////
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [];
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   // Public interface -- ABI
//   deposit(val) {
//     this.movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }

//   approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//     }
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);
// console.log(acc1);

// // acc1.movements.push(250);
// // acc1.movements.push(-140);
// acc1.deposit(250);
// acc1.withdraw(140);

// acc1.requestLoan(1000);
// acc1.approveLoan(1000); // this works right now, but something like this should be private and not publicly accessible

// console.log(acc1);
// console.log(acc1.pin); // same here, this should not be publicly accessible

//////////////////////// Encapsulation: Private Class Fields and Methods Lesson /////////////////////////////
// 1) Public Fields -- property that is present on all instances (but not the prototype)
// 2) Private Fields
// 3) Public Methods
// 4) Private Methods
// STATIC version of these 4 -- these are not accessible on the instance, just the class itself

class Account {
  locale = navigator.language; // public field
  bank = 'Bankist';

  #movements = []; // private field
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface -- API  // Public Methods
  getMovements() {
    // this method is not chainable
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  #approveLoan(val) {
    // Private method
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  static test() {
    console.log('TEST');
  }
  static #test2() {
    console.log('TEST');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(300);
acc1.withdraw(100);
// acc1.movements = []; // don't want this data interference from outside the class...
// console.log(acc1.#movements); // error - reference to undeclared private field or method #movements

acc1.requestLoan(1000);
// acc1.approveLoan(1000); // errors out now

console.log(acc1);
// console.log(acc1.pin); // this returns undefined now

Account.test();
// Account.test2(); // errors

//////////////////////// Chaining Methods Lesson /////////////////////////////
// for chaining just need to `return this` from all these function definitions
const movements = acc1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  .withdraw(4000)
  .getMovements(); // needs to go last since this one is not chainable
console.log(movements);

//////////////////////// ES6 Classes Summary Lesson /////////////////////////////

//////////////////////// CHALLENGE #4 /////////////////////////////
/*
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const car4 = new EVCl('Rivian', 120, 23);
car4.accelerate();
car4.brake();
car4
  .accelerate()
  .chargeBattery(90)
  .accelerate()
  .brake()
  .chargeBattery(90)
  .accelerate();
console.log(car4.speedUS);
