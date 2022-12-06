import { readFileSync } from 'fs';
import path from 'path';
import { exit } from 'process';

const DEBUG = false;

export enum PlayersChoice {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
}

export enum RoundOutcome {
  I_WIN = 'iWin',
  THEY_WIN = 'theyWin',
  TIE = 'tie',
}

type LookupMyChoiceDictionary = {
  [index in PlayersChoice]: PlayersChoice;
};

type LookupDictionary = {
  [index in RoundOutcome]: LookupMyChoiceDictionary;
};

const lookup = {} as LookupDictionary;

const myWinningChoices = {} as LookupMyChoiceDictionary;
myWinningChoices[PlayersChoice.PAPER] = PlayersChoice.SCISSORS;
myWinningChoices[PlayersChoice.ROCK] = PlayersChoice.PAPER;
myWinningChoices[PlayersChoice.SCISSORS] = PlayersChoice.ROCK;

const myLosingChoices = {} as LookupMyChoiceDictionary;
myLosingChoices[PlayersChoice.ROCK] = PlayersChoice.SCISSORS;
myLosingChoices[PlayersChoice.PAPER] = PlayersChoice.ROCK;
myLosingChoices[PlayersChoice.SCISSORS] = PlayersChoice.PAPER;

lookup[RoundOutcome.I_WIN] = myWinningChoices;
lookup[RoundOutcome.THEY_WIN] = myLosingChoices;

function processPuzzle() {
  console.log('Starting Day 02-pt2 Puzzle Solving');

  const absolutePath = path.resolve('./src/day02/input.txt');
  // const absolutePath = path.resolve('./src/day02/smallInput.txt');

  console.log(`Reading from file: ${absolutePath}`);

  const contents = readFileSync(absolutePath, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let totalScore = 0;

  // tslint:disable-next-line: ter-prefer-arrow-callback
  arr.forEach(function(line: string) {
    if (DEBUG) console.log(line);

    if (line !== '') {
      const [opponentInput, outcome] = line.split(' ');

      const opponent = convertToPlayersChoice(opponentInput);

      // Figure out what I need to play
      const mine = getMyChoice(opponent, outcome);

      totalScore += scoreRound(opponent, mine);
    }
  });

  console.log(`Total Score: ${totalScore}`);
}

const getMyChoice = (
  opponentChoice: PlayersChoice,
  outcomeSymbol: string,
): PlayersChoice => {
  // Convert to outcome
  let outcome: RoundOutcome;

  switch (outcomeSymbol) {
    case 'X':
      outcome = RoundOutcome.THEY_WIN;
      break;

    case 'Y':
      outcome = RoundOutcome.TIE;
      break;

    case 'Z':
      outcome = RoundOutcome.I_WIN;
      break;

    default:
      console.log(`ERROR - convertToPlayersChoice!!! ${outcomeSymbol}`);
      exit(1);
  }

  // If a tie - return what they chose.
  if (outcome === RoundOutcome.TIE) {
    if (DEBUG) console.log(`Outcome is: ${opponentChoice}`);
    return opponentChoice;
  }

  const myChoice = lookup[outcome][opponentChoice];

  if (DEBUG) console.log(`Outcome is: ${myChoice}`);

  return myChoice;
};

const convertToPlayersChoice = (input: string): PlayersChoice => {
  switch (input) {
    case 'A': // Rock
      return PlayersChoice.ROCK;
    case 'B': // Paper
      return PlayersChoice.PAPER;
    case 'C': // Scissors
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
  const tie = 3;

  // Tie
  if (score(opponent) === score(mine)) {
    if (DEBUG) console.log(`Tie`);
    return tie;
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
