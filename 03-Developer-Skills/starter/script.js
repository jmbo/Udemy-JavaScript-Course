// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/* ** plug-ins installed:
    * prettier
    * ESLint
    * TODO Highlight

   ** added snippets for:
    * console.log()
*/

/* write a program to take user input and display it to the console */
// const userInput = prompt('Enter your name: ');
// console.log(userInput);

// // PROBLEM 1:
// // We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// // 1) Understanding the problem

// // 2) Breaking up into sub-problems

// const calcTempAmplitude = function (temps) {
//   // https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript

//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   //   console.log(max, min);
//   return max - min;
// };

// calcTempAmplitude([3, 7, 4, 1, 8]);
// calcTempAmplitude(temperatures);

// const amplitude = calcTempAmplitude(temperatures);
// console.log(amplitude);

// // PROBLEM 2:
// // Function should now receive 2 arrays of temps

// // merge 2 arrays
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
// // https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items

// const calcTempAmplitudeNew = function (t1, t2) {
//   const temps = t1.concat(t2);
//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   //   console.log(max, min);
//   return max - min;
// };

// // calcTempAmplitudeNew(temperatures);

// const amplitudeNew = calcTempAmplitudeNew(temperatures, [-10, 20, 30]);
// console.log(amplitudeNew);

//////////////////////// Debugging Lesson /////////////////////////////
// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     // C) FIX the bug
//     // value: prompt('Degrees celsius: '),
//     // value: Number(prompt('Degrees celsius: ')),
//     value: 10,
//   };

//   // B) FIND the bug
//   //   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);
//   //   console.log(measurement);
//   console.table(measurement);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// // A) IDENTIFY the bug
// console.log(measureKelvin());

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   let max = 0;
//   let min = 0;

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];

//     if (typeof curTemp !== 'number') continue;

//     debugger;
//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   //   console.log(max, min);
//   return max - min;
// };

// calcTempAmplitudeBug(temperatures);

// // A) IDENTIFY the bug
// const amplitudeBug = calcTempAmplitudeBug(temperatures, [-10, 20, 30]);
// console.log(amplitudeBug);

//////////////////////// CODING CHALLENGE #1 /////////////////////////////

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures.

Example: [17, 21, 23] will print "... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

// const printForecast = function (arr) {
//     let msg = '...';
//     for (let i = 0; i < arr.length; i++) {
//         msg += ` ${arr[i]}°C in ${i + 1} days ...`;
//     }
//     console.log(msg);
// };

// const printForecast2 = function (arr) {
//     for (let i = 0; i < arr.length; i++) {
//         console.log(`... ${arr[i]}°C in ${i + 1} days ...`);
//     }
// };

// console.log('TEST DATA 1:');
// printForecast([17, 21, 23]);

// console.log('TEST DATA 2:');
// printForecast([12, 5, -5, 0, 4]);


//////////////////////// CODING CHALLENGE #2 with AI /////////////////////////////

/*
Let's say you're building a time tracking application for freelancers. At some point in building this app, you need a function that receives daily work hours for a certain week, and returns:
1. Total hours worked
2. Average daily hours
3. The day with the most hours worked
4. Number of days worked
5. Whether the week was full-time (worked 35 hours or more)

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]
*/

/**
 * Analyzes a week's work hours.
 * @param {number[]} dailyHours - Array of daily work hours (Monday = 0).
 * @returns {object} Analysis of the work week.
 */
function analyzeWorkWeek(dailyHours) {
    if (!Array.isArray(dailyHours) || dailyHours.length !== 7) {
        throw new Error('Input must be an array of exactly 7 numbers (one for each day of the week).');
    }
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
    const daysWorked = dailyHours.filter(h => h > 0).length;
    const avgDailyHours = daysWorked ? +(totalHours / daysWorked).toFixed(1) : 0;
    const maxHours = Math.max(...dailyHours);
    const dayWithMostHoursIdx = dailyHours.indexOf(maxHours);
    const dayWithMostHours = daysOfWeek[dayWithMostHoursIdx];
    const isFullTime = totalHours >= 35;

    return {
        totalHours,
        avgDailyHours,
        dayWithMostHours,
        daysWorked,
        isFullTime,
    };
}

// Example usage:
const weekData = [7.5, 8, 6.5, 0, 8.5, 4, 0];
console.log(analyzeWorkWeek(weekData));

const weekData2 = [7.5, 8, 6.5, 0, 8.5];
console.log(analyzeWorkWeek(weekData2));
