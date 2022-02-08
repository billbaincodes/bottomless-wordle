console.log('js linked');

// const wordChecker = require('./logic');
import { wordChecker } from './logic.js';

// Init variables
let answer = 'pleat'
let guess = '';
let attempt = 0;
let submitBtn = document.getElementById("submit-btn");
let wordField = document.getElementById("word-field")

// Add submit listener
submitBtn.addEventListener('click', (e) => {

  if (attempt >= 4) return;

  console.log({ answer, guess });

  // Check their word!
  let result = wordChecker(answer, guess);

  console.log({ result });

  // Clear the guess input
  wordField.innerText = '';

  // Clear the guess
  guess = ''

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

// Update the board with the proposed guess' letters
const updateBoard = () => {

  // Split guess string into Arr
  const guessArr = guess.split('')

  // Capture spans matching attempt number
  let attemptDiv = document.getElementById(`attempt_${attempt}`);

  // Update each span with corresponding letter
  for (let i = 0; i < attemptDiv.children.length; i++) {
    attemptDiv.children[i].innerText = guessArr[i] || ' ';
  }

}

console.log(submitBtn, wordField);

// import { title } from './store.js'
// import { wordChecker } from './logic.js'

// wordChecker('a', 'b');

// console.log({ title });