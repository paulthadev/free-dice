'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//
// Instruction button & it's Modal Effect
const btnInst = document.querySelector('.instruction-button');
const showInst = document.querySelector('.show-instruction');
const closeInst = document.querySelector('.close-instruction');
const overlay = document.querySelector('.overlay');

// function to Add instuction Pop up Modal
const addModal = function () {
  showInst.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// function to remove instuction Pop up Modal
const removeModal = function () {
  showInst.classList.add('hidden');
  overlay.classList.add('hidden');
};

// button clicks effects
btnInst.addEventListener('click', addModal);
closeInst.addEventListener('click', removeModal);
overlay.addEventListener('click', removeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !showInst.classList.contains('hidden')) {
    removeModal();
  }
});
//
//
//
// Defining Variables
let scores, currentScore, activePlayer, playing;

// Starting Conditions and assigning Variables
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEL.classList.remove('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Involking init (Initialization)
init();

// Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number 1-6
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Displaying the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `src/dice-${dice}.png`;

    // 3. Check for rolled 1:
    if (dice !== 1) {
      // Add dice to Current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // Switch to next Player
    else {
      switchPlayer();
    }
  }
});

// Hold Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is >=100switchPlayer()
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEL.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if, not switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
