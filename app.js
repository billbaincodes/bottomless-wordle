console.log('js linked');


class Guess {

  answer
  guess


  constructor(answer, guess){

    this.answer = answer;
    this.guess = guess;

  }

  

}

let guess1 = new Guess('poodle', 'g')

console.log({ guess1 });

let wordField = document.getElementById("submit-btn");

wordField.addEventListener('click', (e) => {



})

console.log(wordField);