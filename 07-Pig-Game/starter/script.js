'use strict';

// const score0 = document.querySelector('#score--0');
const score0El = document.getElementById('score--0');
// const score1 = document.querySelector('#score--1');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// game state initialization
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const initializeState = function () {
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;

    playing = true;

    document.getElementById(`current--0`).textContent = currentScore;
    document.getElementById(`current--1`).textContent = currentScore;
    score0El.textContent = 0;
    score1El.textContent = 0;

    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');

    diceEl.classList.add('hidden');
};
initializeState();

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    document.querySelector(`.player--0`).classList.toggle('player--active');
    document.querySelector(`.player--1`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a random dice roll
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNumber}.png`;

        // 3. Check for rolled 1: if true, switch to the next player
        if (diceNumber !== 1) {
            // Add dice to current score
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// hold functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // 2a. Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceEl.classList.toggle('hidden');
        } else {
            // 2b. Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', initializeState);
