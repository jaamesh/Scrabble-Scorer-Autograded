// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowels = ["a","e","i","o","u","y"];


  
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble! Enter a word: ");
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   return word.length;
};

let vowelBonusScorer = function(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints = letterPoints + 3;
      } else {
         letterPoints = letterPoints + 1;
      }
   }
   return letterPoints;
};

let scrabbleScorer = function(word) {
	word = word.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
	  letterPoints = letterPoints + Number(newPointStructure[word[i]])
   }
	return letterPoints;
 };

 let simpleScoreAlgorithm = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
 };

 let vowelBonusScoreAlgorithm = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
 };

 let scrabbleScoreAlgorithm = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
 };

const scoringAlgorithms = [simpleScoreAlgorithm, vowelBonusScoreAlgorithm, scrabbleScoreAlgorithm];

function scorerPrompt() {
   let scoringAlgorithmChoice = -1;
   const maxTries = 5;
   let choiceWithinParameters = false;
   let tries = 0;
   let question = "Which scoring algorithm would you like to use?\n";
   let numsToChooseFrom = "";
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      question = question + i + " - " + scoringAlgorithms[i].name + ": " + scoringAlgorithms[i].description + "\n";
      numsToChooseFrom = numsToChooseFrom + i;
      if (i === scoringAlgorithms.length - 2) {
         numsToChooseFrom = numsToChooseFrom + ", or ";
      } else if (i === scoringAlgorithms.length - 1) {
         numsToChooseFrom = numsToChooseFrom + ".";
      } else {
         numsToChooseFrom = numsToChooseFrom + ", ";
      }
   }
   question = question + "Enter " + numsToChooseFrom + " ";
   while (!choiceWithinParameters && tries < maxTries) {
      scoringAlgorithmChoice = Number(input.question(question));
      tries++;
      if (isNaN(scoringAlgorithmChoice) || scoringAlgorithmChoice !== Math.floor(scoringAlgorithmChoice) || scoringAlgorithmChoice < 0 || scoringAlgorithmChoice >= scoringAlgorithms.length) {
         console.log("You must enter " + numsToChooseFrom);
         if (tries === maxTries) {
            console.log("You have exceeded the maximum number of attempts.  A default value of 0 will be used.");
            scoringAlgorithmChoice = 0;
            choiceWithinParameters = true;
         }
      } else {
         choiceWithinParameters = true;
      }
   }
   return scoringAlgorithms[scoringAlgorithmChoice];
}

function transform(oldStructure) {
   let newPointStructure = {};
   for (scoreKey in oldStructure) {
      for (let i = 0; i < oldStructure[scoreKey].length; i++) {
         newPointStructure[oldStructure[scoreKey][i].toLowerCase()] = Number(scoreKey);
      }
   }
   return newPointStructure;
};

function runProgram() {
   let wordToScore = initialPrompt();
   let algorithm = scorerPrompt();
   console.log("algorithm name: ", algorithm.name);
   console.log("scorerFunction result: ", algorithm.scorerFunction(wordToScore));

   console.log(newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
