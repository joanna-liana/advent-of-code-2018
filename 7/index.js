

const path = require('path');
const { fileLinesToArray } = require('../utils/utils');
const inputPath = path.join(__dirname, 'input.txt');


// task 1
// Find the order in which the tasks should be completed
// if multiple tasks are available, sort them alphabetically

const sentencesArray = fileLinesToArray(inputPath);
const taskRegex = /Step (?<preceedingStep>\w) must be finished before step (?<followingStep>\w)/;

const steps = {};
let finalSteps;
let groupsOfAvailableSteps = {};

sentencesArray.forEach(sentence => {
  const { preceedingStep, followingStep } = taskRegex.exec(sentence).groups;

  let savedPreceedingStep = steps[preceedingStep];

  // just to make sure that the preceding step is included in steps object
  if (!savedPreceedingStep) {
    steps[preceedingStep] = {};
  }

  let savedFollowingStep = steps[followingStep];
  let follStepPrecededBy = savedFollowingStep ? steps[followingStep].precededBy : null;

  if (savedFollowingStep) {
    steps[followingStep].precededBy = follStepPrecededBy && Array.isArray(follStepPrecededBy)? [...follStepPrecededBy, preceedingStep] : [preceedingStep];
  } else {
    steps[followingStep] = {
      precededBy: [preceedingStep]
    };
  }
});

const getFinalOrder = () => {
  const availableSteps = [];
  const stepKeys = Object.keys(steps);
  const stepCount = stepKeys.length;
  // check first ones
  stepKeys.forEach(key => {
    if (!steps[key].precededBy) {
      availableSteps.push(key);
      delete steps[key];
    }
  });

  let lastStep;

  const getNextStep = () => {
    let availableStepsSorted = availableSteps.sort((a, b) => a > b);

    groupsOfAvailableSteps[finalSteps ? finalSteps.length : 0] = [...availableStepsSorted];

    lastStep = availableStepsSorted[0];
    availableStepsSorted.splice(0, 1);
  };

  getNextStep();

  finalSteps = [lastStep];

  while (finalSteps.length < stepCount) {
    stepKeys.forEach(key => {
      if (steps[key] && steps[key].precededBy.includes(lastStep)) {
        steps[key].precededBy = steps[key].precededBy.filter(letter => letter !== lastStep);
        if (!steps[key].precededBy.length) {
          availableSteps.push(key);
          delete steps[key];
        }
      }
    });

    getNextStep();

    finalSteps = [...finalSteps, lastStep];
  }
  console.log(finalSteps.join(''));
  return finalSteps.join('');
}

getFinalOrder();
