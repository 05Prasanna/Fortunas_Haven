const symbols = ['❤️', '♦️', '♠️', ];// symbols as a variable
let playerGuesses = [];
// used random function to chosr random symbol
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}
// it is the guess of the player
function makeGuess(symbol) {
    if (!symbols.includes(symbol)) {
        alert('Invalid guess. Please choose from ❤️, ♦️, ♠️.');
        return;
    }


    if (playerGuesses.length < 3) {
        playerGuesses.push(symbol);
        updateGuessDisplay();
    } else {
        alert('You have already made three guesses.');
    }
}

function updateGuessDisplay() {
    const playerGuessDisplay = document.getElementById('playerGuessDisplay');
    playerGuessDisplay.textContent = `Your Guesses: ${playerGuesses.join(', ')}`;
    
    // Update guess history list
    const guessList = document.getElementById('guessList');
    guessList.innerHTML = ''; // Clear previous list
    
    playerGuesses.forEach(guess => {
        const li = document.createElement('li');
        li.textContent = guess;
        guessList.appendChild(li);
    });
}

function spin() {
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');

    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    slot1.textContent = result1;
    slot2.textContent = result2;
    slot3.textContent = result3;

    const result = [result1, result2, result3];

    updateResult(result);
}

function updateResult(result) {
    const messageDisplay = document.getElementById('message');

    if (playerGuesses.length !== 3) {
        setMessage("Please make three guesses before spinning.");
        return;
    }

    if (playerGuesses[0] === result[0] && playerGuesses[1] === result[1] && playerGuesses[2] === result[2]) {
        setMessage("Congratulations! You guessed correctly and won!");
    } else {
        setMessage("Sorry, you guessed incorrectly. Try again.");
    }
}

function setMessage(msg) {
    document.getElementById('message').textContent = msg;
}
function exitGame() {
    history.back();
}