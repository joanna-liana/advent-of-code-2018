
const path = require('path');
const { fileLinesToArray } = require('../utils/utils');
const inputPath = path.join(__dirname, 'input.txt');


// task 1 - find the final sum of frequencies
const numbersArray = fileLinesToArray(inputPath, number);
const startFrequency = 0;
numbersArray.unshift(startFrequency);

const frequencies = new Set();
const sum = numbersArray.reduce((total, current) => {
  const newTotal = total + current;
  frequencies.add(newTotal);
  return newTotal;
});

console.log(sum);

// task 2 - find the first repeated frequency

let repeatedFrequency;
let lastSum = sum;

const repeatFrequency = () => {
  numbersArray.splice(0, 1, lastSum);
  lastSum = numbersArray.reduce((total, current) => {
    const newTotal = total + current;
    if (frequencies.has(newTotal) && !repeatedFrequency) {
      repeatedFrequency = newTotal;
    }
    if (!frequencies.has(newTotal)) {
      frequencies.add(newTotal);
    }
    return newTotal;
  });
};

while (!repeatedFrequency) {
  repeatFrequency();
}

console.log(repeatedFrequency);
