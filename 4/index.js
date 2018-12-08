const path = require('path');
const fs = require('fs');
const {
  fileLinesToArray,
  getKeyWithGreatestValue,
  range,
} = require('../utils/utils');
const inputPath = path.join(__dirname, 'input.txt');

// task 1
// Find the guard that has the most minutes asleep.
// What minute does that guard spend asleep the most?
// What is the ID of the guard you chose multiplied by the minute you chose?

const logsArray = fileLinesToArray(inputPath);
const dateRegex = /^\[(?<fullDate>(?<date>\d{4}\-\d{2}\-\d{2})\s(?<time>\d{2}:(?<minute>\d{2})))\]\s(?<logText>.+)/;

logsArray.sort((a, b) => {
  const dateA = new Date(dateRegex.exec(a).groups.fullDate);
  const dateB = new Date(dateRegex.exec(b).groups.fullDate);
  return +dateA > +dateB ? 1 : +dateA < +dateB ? -1 : 0;
});

fs.writeFileSync('./logArray.js', JSON.stringify(logsArray, null, 2));

const guards = {};

let currentGuard;
let currentFallAsleepTime;
let currentWakeUpTime;

const getMinutesForTheDay = (currentData, newData, currentGuard) => {
  if (currentData) {
    return [...currentData, ...newData];
  } else {
    return newData;
  }
};

logsArray.forEach(log => {
  const { fullDate, date, minute, logText } = dateRegex.exec(log).groups;
  const guardRegex = /Guard\s\#(?<guardId>\d+)/;
  const sleepRegex = /falls asleep/;
  const wakeUpRegex = /wakes up/;

  if (guardRegex.exec(logText)) {
    currentGuard = guardRegex.exec(logText).groups.guardId;
  }
  if (sleepRegex.exec(logText)) {
    currentFallAsleepTime = +minute;
  }
  if (wakeUpRegex.exec(logText)) {
    currentWakeUpTime = +minute;
    const timeAsleep = currentWakeUpTime - currentFallAsleepTime;
    const minutesAsleep = range(
      currentWakeUpTime - currentFallAsleepTime,
      currentFallAsleepTime
    );

    guards[currentGuard]
      ? (guards[currentGuard] = {
        daysAsleep: {
          ...guards[currentGuard].daysAsleep,
          [date]: getMinutesForTheDay(
            guards[currentGuard]['daysAsleep'][date],
            minutesAsleep,
            currentGuard
          ),
        },
        asleepTime: guards[currentGuard].asleepTime + timeAsleep,
      })
      : (guards[currentGuard] = {
        daysAsleep: { [date]: minutesAsleep },
        asleepTime: timeAsleep,
      });
  }
});

const greatestSleepyHead = +getKeyWithGreatestValue(guards, 'asleepTime');

const getGuardMostSleepyMinute = guardId => {
  const winnerDaysAsleep = guards[guardId].daysAsleep;
  const minutesTotalled = {};

  Object.keys(winnerDaysAsleep).forEach(key => {
    winnerDaysAsleep[key].forEach(minute => {
      minutesTotalled[minute]
        ? (minutesTotalled[minute] += 1)
        : (minutesTotalled[minute] = 1);
    });
  });

  const mostSleepyMinute = +getKeyWithGreatestValue(minutesTotalled);

  return {
    mostSleepyMinute,
    numberOfDays: minutesTotalled[mostSleepyMinute],
  };
};

const mostSleepyMinute = +getGuardMostSleepyMinute(greatestSleepyHead)
  .mostSleepyMinute;

// final outcome
const resultOne = greatestSleepyHead * mostSleepyMinute;
console.log(resultOne);



// task 2
// Of all guards, which guard is most frequently asleep on the same minute?

let taskTwoGuardId;
let topMinuteAsleep;
let minuteAsleepDays = 0;

Object.keys(guards).forEach(key => {
  const topMinuteData = getGuardMostSleepyMinute(key);
  if (topMinuteData.numberOfDays > minuteAsleepDays) {
    minuteAsleepDays = topMinuteData.numberOfDays;
    topMinuteAsleep = topMinuteData.mostSleepyMinute;
    taskTwoGuardId = key;
  }
});

const resultTwo = taskTwoGuardId * topMinuteAsleep;
console.log(resultTwo);
