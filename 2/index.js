

const path = require('path');
const { fileLinesToArray } = require('../utils/utils');
const inputPath = path.join(__dirname, 'input.txt');


// we get a list of box IDs

// task 1 - count the IDs containing exactly two of any letter,
// then separately count the IDs containing exactly three of any letter
// mutliply the results to get the checksum

const stringsArray = fileLinesToArray(inputPath);
let matchesOfTwoTotal = 0;
let matchesOfThreeTotal = 0;

stringsArray.forEach(id => {
  const lettersArray = id.split('');
  const lettersSet = new Set();
  const matches = {};
  let matchedTwiceCount = 0;
  let matchesThriceCount = 0;

  lettersArray.forEach(letter => {
    if (lettersSet.has(letter)) {
      matches[letter] ? matches[letter] += 1 : matches[letter] = 2;
    } else {
      lettersSet.add(letter);
    }
  });

  if (Object.keys(matches).length) {
    Object.keys(matches).forEach(key => {
      if (matches[key] === 2) {
        matchedTwiceCount++;
      }
      if (matches[key] === 3) {
        matchesThriceCount++;
      }
    });

    if (matchedTwiceCount) {
      matchesOfTwoTotal++;
    }

    if (matchesThriceCount) {
      matchesOfThreeTotal++;
    }
  }
});

const checksum = matchesOfTwoTotal * matchesOfThreeTotal;
console.log(checksum);


// task 2
// there are 2 IDs which differ by exactly one character at the same position in both strings
// What letters are common between the two correct box IDs?

let soughtID;
let differenceIndex;

stringsArray.forEach(id1 => {
  if (!soughtID) {
    stringsArray.forEach(id2 => {
      if (id1 === id2 || soughtID) { return; }
      const lettersArray1 = id1.split('');
      const lettersArray2 = id2.split('');
      let differencesCount = 0;
      lettersArray1.forEach((letter, index) => {
        if (letter !== lettersArray2[index]) {
          differenceIndex = index;
          differencesCount++;
        }
      });

      if (differencesCount === 1) {
        soughtID = id1;
      }
    });
  }
});

console.log(soughtID);

const getOverlappingLetters = () => {
  const lettersArray = soughtID.split('');
  lettersArray.splice(differenceIndex, 1);
  const finalString = lettersArray.join('');
  return finalString;
}

console.log(getOverlappingLetters());