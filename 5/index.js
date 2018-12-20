const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'input.txt');

// // task 1
// // How many units remain after fully reacting the polymer you scanned?
// // reaction: aA || Aa get eliminated
const polymerString = fs.readFileSync(inputPath, 'utf-8');

const react = polymerString => {
  const polymerArray = polymerString.split('');
  let newChars = [];
  let lastChar = '';

  polymerArray.forEach((char, i) => {
    if (
      (char.toLowerCase() === lastChar && char.toLowerCase() !== char) ||
      (char === lastChar.toLowerCase() && lastChar !== lastChar.toLowerCase())
    ) {
      lastChar = '';
      return;
    }

    newChars.push(lastChar);
    lastChar = char;

    if (i === polymerArray.length - 1) {
      newChars.push(char);
    }
  });
  return newChars.join('');
};

const getLengthAfterFullReact = originalString => {
  let inputString = originalString;
  let outputString = react(inputString);

  while (inputString !== outputString) {
    inputString = outputString;
    outputString = react(inputString);
  }

  return outputString.length;
}

const result = getLengthAfterFullReact(polymerString);
console.log(result);


// task 2
// One of the unit types is causing problems;
// it's preventing the polymer from collapsing as much as it should.
// Your goal is to figure out which unit type is causing the most problems,
// remove all instances of it (regardless of polarity),
// fully react the remaining polymer, and measure its length.
// e.g. remove a/A, b/B, etc.

const alphabetLettersCount = 26;
const lowerCaseStart = 'a'.charCodeAt();
const upperCaseStart = 'A'.charCodeAt();

let removalResults = {};

for (let i = 0; i < alphabetLettersCount; i++) {
  const letters = `${String.fromCharCode(i + lowerCaseStart)}|${String.fromCharCode(i + upperCaseStart)}`;
  const replaceRegex = new RegExp(letters, 'g');
  const parsedOutput = outputString.replace(replaceRegex, '');
  removalResults[i] = getLengthAfterFullReact(parsedOutput);
}

let bestResult;

// What is the length of the shortest polymer you can produce?
Object.keys(removalResults).forEach(key => {
  if (!bestResult || removalResults[key] < bestResult) {
    bestResult = removalResults[key];
  }
});

console.log(bestResult);
