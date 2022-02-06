let puzzle1 = { answer: 'pleat', guess: 'teeth', }
let puzzle2 = { answer: 'knoll', guess: 'lilts', }
let puzzle3 = { answer: 'abcde', guess: 'eeeee', }
let puzzle4 = { answer: 'ddecc', guess: 'eeeee', }
let puzzle5 = { answer: 'knoll', guess: 'flail', }
let puzzle6 = { answer: 'zeezz', guess: 'eqeee', }

// Extract answer and guess
let { answer, guess } = puzzle5;

// Check that word!!
export const wordChecker = (answer, guess) => {

  console.log({ answer, guess });

  // Split strings into arrays
  let answerArr = answer.split('');
  let guessArr = guess.split('');
  
  // Get count of all letter occurrences
  let answerCount = answerArr.reduce((accum, letter) => {
    if ( !accum[letter]) { accum[letter] = 1;} 
    else { accum[letter]++ }
    return accum;
  }, {})

  // Track how many times each letter has been guessed
  let guessCount = {};

  // We need to know greens ahead of time to solve
  answerArr.map((correctLetter, i) => {
    let guessedLetter = guessArr[i];
    if (guessedLetter === correctLetter) {
      if (!guessCount[correctLetter]) { guessCount[correctLetter] = 1 } 
      else if (guessCount[correctLetter]) { guessCount[correctLetter]++ }
    }
  })

  // Solve the puzzle
  return answerArr.reduce((accum, correctLetter, i) => {
    let guessedLetter = guessArr[i];

    // GREEN
    if ( guessedLetter === correctLetter ) { accum.push('green'); }

    // YELLOW
    else if (
      answerArr.includes(guessedLetter) && 
      (guessCount[guessedLetter] || 0) < answerCount[guessedLetter]
    ) {

      // We found a yellow, add to our count
      if (!guessCount[guessedLetter]) { guessCount[guessedLetter] = 1 }
      else if (guessCount[guessedLetter]) { guessCount[guessedLetter]++ } 

      // Push yellow to answer
      accum.push('yellow');
    }

    // GRAY
    else { accum.push('grey'); }

    // Return the accumulator
    return accum;

  }, []);

  // Green
  // Correct letter is in correct position

  // Yellow
  // Word contains letter
  // AND
  // Letter is not in correct position
  // AND
  // Number of letter occurences has not already been yellowed
  // AND
  // Number of letter occurences has not already been greened

  // Gray
  // Word does not contain letter
  // OR
  // All occurences of given letter have already been greened


}

// module.exports = wordChecker;



// let result = wordChecker(answer, guess);

// console.log({ answer, guess, result });




// VERSION 1
// let wordChecker = (answer, guess) => {

//   answerArr = answer.split('');
//   guessArr = guess.split('');

//   return answerArr.reduce((accum, correctLetter, i) => {

//     let guessedLetter = guess[i];
//     let alreadyGiven = {}

//     if (
//       answer.includes(guessedLetter) &&
//       !alreadyGiven[guessedLetter] &&
//       correctLetter != guessedLetter
//     ) {
//       console.log({ alreadyGiven });
//       accum.push('yellow')
//     } if (
//       correctLetter === guessedLetter
//     ) {
//       accum.push('green')
//       alreadyGiven[correctLetter] = true;
//     } else (
//       accum.push('gray')
//     )

//     return accum;
//   }, []).join();

// }




// VERSION 2.0
// YELLOW
// else if (
//   answerArr.includes(guessedLetter) && /* Word contains letter */
//   (
//     !guessCount['yellow'][guessedLetter] ||
//     answerCount[guessedLetter] > guessCount['yellow'][guessedLetter] ||
//     answerCount[guessedLetter] > guessCount['green'][guessedLetter]
//   )
// ) {

//   // Add letter to guessCount
//   if (!guessCount['yellow'][guessedLetter]) {
//     guessCount['yellow'][guessedLetter] = 1
//   } else if (guessCount['yellow'][guessedLetter]) {
//     guessCount['yellow'][guessedLetter]++
//   }


//   accum.push('yellow');
// }

// // GRAY
// else {
//   accum.push('gray');
// }