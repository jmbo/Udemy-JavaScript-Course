'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

//////////////////////// Our First AJAX Call: XMLHttpRequest Lesson /////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest(); // old way of doing AJAX requests
//   // using REST Countries -- should try to use HTTPS and CORS (Cross-Origin Resource Sharing) APIs
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   // data = request.send() // cannot do this since this is being done in the background
//   request.send();
//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//           <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//                 `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// // getCountryData('portugal');
// // getCountryData('usa');
// // getCountryData('germany');

// //////////////////////// Welcome to Callback Hell Lesson /////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
                `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// // AJAX call country 1
// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest(); // old way of doing AJAX requests
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);

//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const neighbor = data.borders?.[0];

//     if (!neighbor) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest(); // old way of doing AJAX requests
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// ** makes code look very messy and hard to understand and not good for development
// setTimeout(() => {
//   console.log(' 1 second passed');
//   setTimeout(() => {
//     console.log(' 2 second passed');
//     setTimeout(() => {
//       console.log(' 3 second passed');
//       setTimeout(() => {
//         console.log(' 4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// ** we can use promises to better develop

//////////////////////// Promises and the Fetch API Lesson /////////////////////////////
// using REST Countries -- should try to use HTTPS and CORS (Cross-Origin Resource Sharing) APIs
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// data = request.send() // cannot do this since this is being done in the background
// request.send();

// const country = 'portugal';
// const request = fetch(`https://restcountries.com/v2/name/${country}`);
// console.log(request); // returns a promise

//////////////////////// Consuming Promises Lesson /////////////////////////////
// const getCountryData_Ex = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // available on all responses objects coming from fetch()
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//////////////////////// Chaining Promises Lesson /////////////////////////////
// simplified code block
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);

//         return response.json();
//       }
//       //,   err => alert(err) // we can add error callback functions everywhere... but that's annoying
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       //   const neighbor = data[0].borders?.[0];
//       const neighbor = 'adfasfs';

//       if (!neighbor) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message} Try again!`);
//     }) // catches any errors propagated through the promise chain
//     .finally(() => {
//       // this only works because catch() also returns a promise
//       countriesContainer.style.opacity = 1;
//     }); // always called no matter if the promise is fulfilled or rejected (i.e. hide a loaded spinner)
// };
// // getCountryData('portugal');
// getCountryData('germany');

//////////////////////// Handling Rejected Promises Lesson /////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
// getCountryData('sdfasdportugal'); // true error is not quite returned because promise was fulfilled but with a 404 and thus the catch() doesn't quite grab the true error

//////////////////////// Throwing Errors Manually Lesson /////////////////////////////
// helper function
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      if (!neighbor) throw new Error('No neighbor found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// getCountryData('portugal');

// btn.addEventListener('click', function () {
//   //   getCountryData('portugal');
//   //   getCountryData('australia');
//   getCountryData('india');
// });
//////////////////////// CHALLENGE #1/////////////////////////////
// Coding Challenge #1

// /*
// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
// The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀
// */
// //https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// // 1
// const whereAmI = function (lat, lng) {
//   fetch(
//     // 2
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       if (!response.ok)
//         // 5
//         throw new Error(`Something went wrong - status: (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`); // 3
//       //   getCountryData(data.countryName.toLowerCase());

//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Something went wrong - status: (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       //   console.log(data[0]);

//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       // 4
//       console.error(`Error detected: ${err}`);
//     });
// };

// // whereAmI
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////// Asynchronous Behind the Scenes: The Event Loop Lesson /////////////////////////////
//////////////////////// The Event Loop in Practice Lesson /////////////////////////////
// console.log('Test start'); // prints first
// setTimeout(() => console.log('0 sec timer'), 0); // prints fifth even though it finishes at 0 because it has a lower priority
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // prints third because it's a microtask and finishes at 0 along with the timer
// Promise.resolve('Resolved promise 2').then(res => {
//   // prints fourth -- this take priority still even though it takes forever
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end'); // prints second

//////////////////////// Building a Simple Promise Lesson /////////////////////////////
// // promise takes exactly one argument -- the executor function which take a resolve and reject function
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     // we now create some asynchronous behavior into the promise which is what we expect
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// // let's consume the built promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // promisifying = wrap old callback based asynchronous behavior to promise based

// // promisifying setTimeout
const wait = function (seconds) {
  // impossible for time to fail, so we don't specify the reject parameter
  return new Promise(function (resolve, _) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for an extra 1 second');
//   });

// // previous example of chaining timeouts
// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed'));

// Promise.resolve('abc').then(x => console.log(x)); // create a successful promise right away that resolves immediately
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

//////////////////////// Promisifying the Geolocation APILesson /////////////////////////////
// navigator.geolocation.getCurrentPosition(
//   // callback based API that can be promisified to promise based API
//   position => console.log(position),
//   err => console.error(err)
// );
// console.log('Getting position'); // this logs first because the above function backgrounds those tasks

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Something went wrong - status: (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       //   console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`); // 3

//       return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Something went wrong - status: (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data))
//     .catch(err => console.error(`Error detected: ${err}`));
// };

// btn.addEventListener('click', whereAmI);

//////////////////////// CHALLENGE #2/////////////////////////////
// Coding Challenge #2

/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// 1
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      const images = document.querySelector('.images'); // could create this outside as a global variable
      images.insertAdjacentElement('afterbegin', image); // can call images.append(img) instead
      resolve(image);
    });
    image.addEventListener('error', () =>
      reject(new Error('Could not load image'))
    );
  });
};
// // 2
// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-234.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .catch(err => console.error('Could not display image:', err));

//////////////////////// Consuming Promises with Async/Await Lesson /////////////////////////////
// await fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`)
//   await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   );
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data'); // manually reject for 403/404
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));
    // const res = await fetch( `https://restcountries.com/v2/name/${dataGeo.country}`);
    const res = await fetch(
      `https://restcountries.com/v2/alpha/${dataGeo.countryCode}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();

    // console.log(data);
    renderCountry(data);
    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error(`${err} 💥`); // still not catching non-generated errors like 403/404
    renderError(`Something went wrong ${err.message} 💥`);

    // reject promise returned from async function
    throw err;
  }
};

// whereAmI();
console.log('FIRST'); // this still prints first, function above is sent to the background with async

//////////////////////// Error Handling With try...catch Lesson /////////////////////////////
// try {
//   let y = 1;
//   const x = 2;

//   x = 3;
// } catch (err) {
//   alert(err.message);
// }
//////////////////////// Returning Values from Async Functions Lesson /////////////////////////////
// console.log(`1: Will get location`);
// whereAmI(); // if async, this will execute last (3rd), if not async, it will execute in the middle (2nd)
// console.log(`2: Finished getting location `);

// what if we wanted a return value ???
// console.log(`1: Will get location`);
// const city = whereAmI();
// console.log(city); // returns Promise { <state>: "pending" }
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log(`3: Finished getting location `));

// // there's still a problem -- this mixes async/await with handling promises (mixes old and new and sort of inconsistent)
// // there's a proposal to make use of await outside a function, but for now can only be used inside the function, therefore we can use IIFE
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log(`3: Finished getting location`);
// })();

//////////////////////// Running Promises in Parallel Lesson /////////////////////////////
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`); // this does not make too much sense...
//     const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`); // why does this have to wait for the previous one?
//     const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`); // or this one? we can run them in parallel
//     console.log([data1.capital, data2.capital, data3.capital]);

//     // efficient alternative running in parallel
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]); // can also just handle this with a then method if not using async/await
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');
//////////////////////// Other Promise Combinators: race, allSettled and any Lesson /////////////////////////////
// Promise.race -- receives array of promises and returns a promise as soon as a value is settled (resolved or rejected)
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);
//   console.log(res[0]); // just one result, not an array
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/tanzania`),
//   timeout(1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled -- array of all settled promises (resolved and rejected)
// Promise.allSettled([
//   // generates an array with all Promise outcomes
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   // generates an error that needs to be caught
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any -- [ES2021] -- returns first fulfilled/resolved promise ()
// Promise.any([
//   Promise.resolve('Success'), // this one is returned
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//////////////////////// CHALLENGE #3/////////////////////////////
// Coding Challenge #3

/*
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// 1
const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-3.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(`Could not display image: ${err}`);
  }
};

// loadNPause();

// 2
const loadAll = async function (imgArr) {
  try {
    const imgPromises = imgArr.map(img => createImage(img));
    // const imgPromises = imgArr.map(async img => await createImage(img));
    console.log(imgPromises);

    const imgs = await Promise.all(imgPromises);
    console.log(imgs);

    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(`Could not display image: ${err}`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
