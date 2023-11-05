'use strict';

// Selecting elements
const player_1 = document.querySelector('.player--0');
const player_2 = document.querySelector('.player--1');

const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');

const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let playing = true; // Flag.

score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0]; // Total Scores
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // Switch the player
    currentScore = 0;

    player_1.classList.toggle('player--active');
    player_2.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', () => {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./assets/dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player

        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

document.querySelector('.btn--hold').addEventListener('click', () => {
    // 1. Add current score to active player's score
    if (playing) {
        scores[activePlayer] += currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];
    }

    // 2. Check if player's score is >= 50
    if (scores[activePlayer] >= 50) {
        // Finish game

        playing = false;

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');

        document.querySelector(`#name--${activePlayer}`).textContent =
            'Winner!';
    } else {
        // 3. Switch to the next player.
        switchPlayer();
    }
});

// Reset Game Functionality

btnNew.addEventListener('click', () => {
    // Winner's name

    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
    }`;

    // Winner's background

    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');

    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    activePlayer = 0;

    // Total score for two players
    score1El.textContent = 0;
    score2El.textContent = 0;
    // Current score for two players
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    currentScore = 0;
    (scores[0] = 0), (scores[1] = 0);
    // Flag: playing -> true
    playing = true;
    diceEl.classList.add('hidden');
});
