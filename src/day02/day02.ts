import { readFileSync } from 'fs';
import path from 'path';
import { exit } from 'process';

export enum PlayersChoice {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
}

function processPuzzle() {
  console.log('Starting Day 02 Puzzle Solving');

  const absolutePath = path.resolve('./src/day02/input.txt');

  console.log(`Reading from file: ${absolutePath}`);

  const contents = readFileSync(absolutePath, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let totalScore = 0;

  // tslint:disable-next-line: ter-prefer-arrow-callback
  arr.forEach(function(line: string) {
    console.log(line);

    if (line !== '') {
      const [opponent, mine] = line.split(' ');
      totalScore += scoreRound(
        convertToPlayersChoice(opponent),
        convertToPlayersChoice(mine),
      );
    }
  });

  console.log(`Total Score: ${totalScore}`);
}

const convertToPlayersChoice = (input: string): PlayersChoice => {
  switch (input) {
    case 'A': // Rock
    case 'X': // Rock
      return PlayersChoice.ROCK;
    case 'B': // Paper
    case 'Y': // Paper
      return PlayersChoice.PAPER;
    case 'C': // Scissors
    case 'Z': // Scissors
      return PlayersChoice.SCISSORS;

    default:
      console.log(`ERROR - convertToPlayersChoice!!! ${input}`);
      exit(1);
  }
};

const score = (choice: PlayersChoice): number => {
  switch (choice) {
    case PlayersChoice.ROCK:
      return 1;

    case PlayersChoice.PAPER:
      return 2;

    case PlayersChoice.SCISSORS:
      return 3;

    default:
      console.log(`ERROR - Score!!! ${choice}`);
      exit(1);
  }
};

const outcome = (opponent: PlayersChoice, mine: PlayersChoice): number => {
  const iWin = 6;
  const theyWin = 0;

  // Tie
  if (score(opponent) === score(mine)) {
    console.log(`Tie`);
    return 3;
  }

  switch (opponent) {
    case PlayersChoice.ROCK:
      if (mine === PlayersChoice.PAPER) {
        return iWin;
      }
      if (mine === PlayersChoice.SCISSORS) {
        return theyWin;
      }

      console.error(`Failed Case Matching: ${opponent} ${mine}`);
      exit(1);
      break;

    case PlayersChoice.PAPER:
      if (mine === PlayersChoice.ROCK) {
        return theyWin;
      }
      if (mine === PlayersChoice.SCISSORS) {
        return iWin;
      }

      console.error(`Failed Case Matching: ${opponent} ${mine}`);
      exit(1);
      break;

    case PlayersChoice.SCISSORS:
      if (mine === PlayersChoice.PAPER) {
        return theyWin;
      }
      if (mine === PlayersChoice.ROCK) {
        return iWin;
      }
  }

  console.error(`Failed Case Matching: ${opponent} ${mine}`);
  exit(1);
};

const scoreRound = (opponent: PlayersChoice, mine: PlayersChoice): number => {
  const myShapeScore = score(mine);
  const outcomeScore = outcome(opponent, mine);

  const totalScore = myShapeScore + outcomeScore;
  return totalScore;
};

processPuzzle();
