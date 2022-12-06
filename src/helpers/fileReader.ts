import { readFileSync } from 'fs';

export const readInputToArrayAndSum = (filename: string): number[] => {
  console.log(`Reading from file: ${filename}`);
  const toReturn: number[] = [];

  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let index = 1;

  arr.forEach(function(line) {
    // console.log(line);

    if (line === '') {
      index++;
    } else {
      if (toReturn[index] === undefined) {
        toReturn[index] = parseInt(line);
      } else {
        toReturn[index] += parseInt(line);
      }
    }
  });

  return toReturn;
  // return toReturn;
};
