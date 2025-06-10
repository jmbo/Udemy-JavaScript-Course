'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;

// document.querySelector('.guess').value = 2;
// console.log(document.querySelector('.guess').value);

let changeMessageScore = function (message, score) {
    document.querySelector('.message').textContent = message;
    document.querySelector('.score').textContent = score;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    console.log(guess);

    if (!guess) {
        document.querySelector('.message').textContent = '⛔ No Number!';

        // When player wins
    } else if (guess === secretNumber) {
        changeMessageScore('🎉 Correct Number!', score);
        if (score > Number(document.querySelector('.highscore').textContent)) {
            document.querySelector('.highscore').textContent = score;
        }

        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        // When player is wrong
    } else if (guess !== secretNumber) {
        if (score > 1) {
            changeMessageScore(
                guess > secretNumber ? '📈 Too high!' : '📉 Too Low!',
                --score
            );
        } else {
            changeMessageScore('💥 You lost the game!', 0);
        }
    }
});

//////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/*
Implement a game reset functionality, so that the player can make a new guess!
Here is how you can do it:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input fields
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/

document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    changeMessageScore('Start guessing...', score);

    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';

    secretNumber = Math.trunc(Math.random() * 20) + 1;
});
