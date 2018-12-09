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

let inputString = polymerString;
let outputString = react(inputString);

while (inputString !== outputString) {
  inputString = outputString;
  outputString = react(inputString);
}

const result = outputString.length;
console.log(result);
