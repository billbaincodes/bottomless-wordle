console.log('js linked');

import { wordChecker } from './logic.js';

// Store/retrieve index
let index = localStorage.getItem('wordIndex');
if (!index) { localStorage.setItem('wordIndex', '0') }

// Init variables
let answer = ''
let guess = '';
let attempt = 0;
let wordList = undefined;
let submitBtn = document.getElementById("submit-btn");
let wordField = document.getElementById("word-field");
let nextBtn = document.getElementById("next-word");
let prevBtn = document.getElementById("prev-word");
let wordCounter = document.getElementById("word-counter");

const wordGetter = async (wordIndex) => {

  // Fetch the list of playable words
  await fetch("./wordList.json")
  .then(response => response.json())
  .then(json => wordList = json);
  // Assign the answer 
  answer = (wordList[wordIndex]).toUpperCase();
  console.log({ answer });
}

// Add submit listener
submitBtn.addEventListener('click', async (e) => {
  let isWord = await checkWordExists(guess);

  if (!isWord) { 
    alert('that aint a word!')
    return; 
  }

  // Check their word!
  let result = wordChecker(answer, guess);
  // Color the tiles appropriately
  colorLetters(result);

  // Clear the guess input
  wordField.value = '';
  // Clear the guess
  guess = ''
  // Check if they guessed the word
  if (!result.includes('grey') && !result.includes('yellow')) {
    setTimeout(() => {
      alert('You Win!');
    }, 1000);
    submitBtn.setAttribute('disabled', true);
    wordField.setAttribute('disabled', true);
    return;
  }

  if (attempt == 4) {
    submitBtn.setAttribute('disabled', true);
    wordField.setAttribute('disabled', true);
    setTimeout(() => {
      alert('Better luck next time!');
    }, 1000);
  }

  // Increment attempt number
  attempt++
});

// Add word input listener
wordField.addEventListener('keyup', (e) => {
  // Update guess with value from input
  guess = e.target.value.toUpperCase()
  // Update the letters on the board
  updateBoard();
});

nextBtn.addEventListener('click', (e) => {
  nextWord();
})

prevBtn.addEventListener('click', (e) => {
  prevWord();
})

// Update the board with the proposed guess' letters
const updateBoard = () => {
  // Split guess string into Arr
  const guessArr = guess.split('')
  // Capture spans matching attempt number
  let letters = getLetters(attempt);
  // Update each span with corresponding letter
  for (let i = 0; i < letters.length; i++) {
    letters[i].innerText = guessArr[i] || ' ';
  }
}

// Assign classes to color letters
const colorLetters = async (colorList) => {
  // Capture spans matching attempt number
  let letters = getLetters(attempt);
  // Update each span with corresponding letter
  for (let i = 0; i < letters.length; i++) {
    letters[i].setAttribute('class', `letter ${(colorList[i] || '')}`);
  }

}

// Get the letters for current attempt
const getLetters = (attemptNumber) => {
  // Capture spans matching attempt number
  let attemptDiv = document.getElementById(`attempt_${attemptNumber}`);
  return attemptDiv.children;
}

const resetBoard = () => {
  // Reset letters for each attempt block
  for (let i = 0; i < 5; i++) {
    let letters = getLetters(i);
    for (let ii = 0; ii < letters.length; ii++) {
      letters[ii].setAttribute('class', `letter`);
      letters[ii].innerText = '';
    }
  }
  // Re-enable buttons
  submitBtn.removeAttribute('disabled');
  wordField.removeAttribute('disabled');
  // Reset attempt number
  attempt = 0;
  // Reset guess
  wordField.value = '';
  // Dis/enable buttons if index is at max or min
  if (index == 0) { prevBtn.setAttribute('disabled', true) }
  else { prevBtn.removeAttribute('disabled'); }
  if (index == wordList.length) { nextBtn.setAttribute('disabled', true); }
  else { nextBtn.removeAttribute('disabled'); }
  // Set word counter
  wordCounter.innerText = `Playing word ${index} of ${wordList.length}`
}

const nextWord = () => {
  index++
  localStorage.setItem("wordIndex", index);
  answer = (wordList[index]).toUpperCase();
  resetBoard();
  console.log({answer})
}

const prevWord = () => {

  index--
  localStorage.setItem("wordIndex", index);
  answer = (wordList[index]).toUpperCase();
  resetBoard();
  console.log({answer})
}


const checkWordExists = async (word) => {
  let isWord = null;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  console.log({ url });
  await fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log({ json });
      isWord = json
    });
  console.log('is it a word?', Array.isArray(isWord))
  return Array.isArray(isWord);
}



// Get the first word and clean board
const run = async () => {
  await wordGetter(index);
  resetBoard()
}

// Let's Wordle!!
run();
