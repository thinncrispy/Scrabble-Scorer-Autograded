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



function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let scrabbWord = input.question("Let's play some Scrabble!\nEnter a word to score: ")
   console.log(vowelBonusScorer(scrabbWord));
};

let simpleScorer = function simpleScorer(word){
   word = word.toUpperCase();
	let score = 0;
 
	for (let i = 0; i < word.length; i++) {
      score += 1;
	}
	return score;
};

let vowelBonusScorer = function vowelBonusScorer(word){
   word = word.toUpperCase();
   let score = 0;

   for (let i = 0; i < word.length; i++){
      if (['A', 'E', 'I', 'O', 'U'].includes(word[i])){
         score += 3;
      }
      else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function scrabbleScorer(word){
   word = word.toLowerCase();
   let score = 0;
   let newPointStructure = transform(oldPointStructure);

   for (let i = 0; i < word.length; i++){
      let letter = word[i]
      if (newPointStructure.hasOwnProperty(letter)) {
         score += newPointStructure[letter];
      }
   }
   return score;
};

const scoringAlgorithms = [
   {      
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer

   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithim.",
      scorerFunction: scrabbleScorer
   },
];

function scorerPrompt() {
   let scrabbWord = input.question("Let's play some Scrabble!\nEnter a word to score: ")
   console.log(scrabbWord)
   console.log(" 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points  \n 2 -  Scrabble: Uses Scrabble point system");
   let selection = input.question("Which scoring Algorithm Would you like to use?")
   if (selection == 0) {
      console.log(scoringAlgorithms[0].scorerFunction(scrabbWord));
   } else if (selection == 1) {
      console.log(scoringAlgorithms[1].scorerFunction(scrabbWord));
   } else if (selection == 2 ) {
      console.log(scoringAlgorithms[2].scorerFunction(scrabbWord));
   }
};

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure){
      let letters = oldPointStructure[pointValue];

      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
         newPointStructure[letter] = Number(pointValue);
      }
   }
   return newPointStructure
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   scorerPrompt();
   
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
