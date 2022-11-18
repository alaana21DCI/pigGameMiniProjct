'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
diceEl.classList.add('hidden'); // hiding the dice:
score0El.textContent = 0;
score1El.textContent = 0;
// state/help variables::::
let scores, currentScore, activePlayer, playing;
// reuseable functions(value)
// initial function // first run time + restart the game

const init = function () {
  // state/help variables::::
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0; // player--0
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};
init();

// switch player
const switchPlayer = function () {
  // change the text current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Switch to next PLayer
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLLING dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //console.log(dice);

    // 3. Check for rolled 1: not true, add dice to current score. if true, switch to next PLayer
    if (dice !== 1) {
      // Add dice to current scor
      currentScore += dice;
      // currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLDING dice functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add currentScore to active player's score
    scores[activePlayer] += currentScore;
    //// score[1]= score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >=100
    if (scores[activePlayer] >= 20) {
      //// finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. switch to the next player
      switchPlayer();
    }
  }
});

// restarting game functionality
// reset all :
btnNew.addEventListener('click', init);

// btnNew.addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   // internal variables reset
//   scores = [0, 0];
//   playing = true;
//   diceEl.classList.add('hidden');
//   currentScore = 0;
// });
