const { readFileSync } = require('fs');

const getKeyWithGreatestValue = (object, keyProperty = null) => {
  let winningKey;
  let currentGreatestValue = 0;

  Object.keys(object).forEach(key => {
    const itemToCheck = keyProperty ? object[key][keyProperty] : object[key];
    if (itemToCheck > currentGreatestValue) {
      currentGreatestValue = itemToCheck;
      winningKey = key;
    }
  });

  return winningKey;
};

const fileLinesToArray = (filePath, arrayType = 'string') => {
  const input = readFileSync(filePath).toString();

  let finalArray = input.split('\r\n');

  if (arrayType === 'number') {
    finalArray = finalArray.map(stringifiedNumber => +stringifiedNumber);
  }

  return finalArray;
};

const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map(i => i + startAt);
};

module.exports = {
  getKeyWithGreatestValue,
  fileLinesToArray,
  range,
};
