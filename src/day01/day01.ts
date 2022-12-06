/* eslint-disable @typescript-eslint/no-var-requires */
import { readInputToArrayAndSum } from '../helpers/fileReader';
const path = require('path');

console.log('Starting Day 01 Puzzle Solving');

const absolutePath = path.resolve('./src/day01/input.txt');
const input = readInputToArrayAndSum(absolutePath);

let max = 0;

let runningMax = 0;

let maxElfNumber = 0;
let maxElfNumber2 = 0;
let maxElfNumber3 = 0;

for (let elfNumber = 0; elfNumber < input.length; elfNumber++) {
  if (input[elfNumber] > max) {
    max = input[elfNumber];
    maxElfNumber = elfNumber;
  }
}

runningMax = max;
max = 0;

for (let elfNumber = 0; elfNumber < input.length; elfNumber++) {
  if (input[elfNumber] > max && elfNumber !== maxElfNumber) {
    max = input[elfNumber];
    maxElfNumber2 = elfNumber;
  }
}

runningMax += max;
max = 0;

for (let elfNumber = 0; elfNumber < input.length; elfNumber++) {
  if (
    input[elfNumber] > max &&
    elfNumber !== maxElfNumber &&
    elfNumber !== maxElfNumber2
  ) {
    max = input[elfNumber];
    maxElfNumber3 = elfNumber;
  }
}

runningMax += max;

console.log(
  `Elf: ${maxElfNumber} ${maxElfNumber2} ${maxElfNumber3} Calories: ${runningMax}`,
);

console.log('done');
