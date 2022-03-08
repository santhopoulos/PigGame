'use strict';

// Selecting elements
//second way to select an element by ID. A little faster than querySelector
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const gameReset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
gameReset();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Beggining of the game - Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    // 2 Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`; //Dynamically load images
    // 3 Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      console.log(currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // document.querySelector('#current--0').textContent = currentScore;
      // current0EL.textContent = CurrentScore;
      //Add dice to the current score
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 30) {
      // Finish the game
      document.querySelector('.dice').classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the other player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', gameReset);

// Working with ID's    -->  #
// Working with classes -->  .
