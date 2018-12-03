
const path = require('path');
const { fileLinesToArray } = require('../utils/utils');
const inputPath = path.join(__dirname, 'input.txt');


// task 1 - find overlapping patches
// input file contains the position and the size of a single patch
// Patch string definition:
// The number of inches between the left edge of the fabric and the left edge of the rectangle.
// The number of inches between the top edge of the fabric and the top edge of the rectangle.
// The width of the rectangle in inches.
// The height of the rectangle in inches.

const patchesArray = fileLinesToArray(inputPath);
const uniqueFields = new Set();
const overlappingFields = new Set();

const getPatchData = patchString => {
  const patchRegex = /#(?<id>\d+)\s@\s(?<x>\d+),(?<y>\d+):\s(?<width>\d+)x(?<height>\d+)/;
  const id = +patchRegex.exec(patchString).groups.id;
  const xStart = +patchRegex.exec(patchString).groups.x;
  const yStart = +patchRegex.exec(patchString).groups.y;
  const width = +patchRegex.exec(patchString).groups.width;
  const height = +patchRegex.exec(patchString).groups.height;

  return { id, xStart, yStart, width, height };
};

const getOccupiedFields = patchData => {
  const { xStart, yStart, width, height } = patchData;
  const fields = new Set();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      fields.add(`x${xStart + i}y${yStart + j}`);
    }
  }
  return fields;
}

patchesArray.forEach(patch => {
  const patchData = getPatchData(patch);
  const fields = getOccupiedFields(patchData);

  fields.forEach(field => uniqueFields.has(field) ? overlappingFields.add(field) : uniqueFields.add(field));
});

console.log(overlappingFields.size);


// task 2 - find the only unique patch with no overlap

let uniquePatch;

patchesArray.forEach(patch => {
  const patchData = getPatchData(patch);
  const fields = getOccupiedFields(patchData);
  let isUnique = true;

  fields.forEach(field => {
    if (overlappingFields.has(field)) {
      isUnique = false;
    }
  });
  if (isUnique) {
    uniquePatch = patchData.id;
  }
});

console.log(uniquePatch);
