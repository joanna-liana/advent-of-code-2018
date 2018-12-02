const { readFileSync } = require('fs');


const fileLinesToArray = (filePath, arrayType = 'string') => {
  const input = readFileSync(filePath).toString();

  let finalArray = input.split('\r\n');

  if (arrayType === 'number') {
    finalArray = finalArray.map(stringifiedNumber => +stringifiedNumber);
  }

  return finalArray;
};

module.exports = {
  fileLinesToArray,
};