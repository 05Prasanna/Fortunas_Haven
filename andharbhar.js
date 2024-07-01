// Variables to store game state
let deck = [];
let pickedCard = '';
let chosenSide = '';

// Function to create a deck of cards
function createDeck() {
    let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ card: rank + ' of ' + suit });
        }
    }
    // Shuffle the deck
    deck.sort(() => Math.random() - 0.5);
}

// Function to start the game
function startGame() {
    createDeck();
    pickedCard = deck[Math.floor(Math.random() * deck.length)]; // Pick a random card from the deck
    document.getElementById('deckContainer').classList.remove('hidden');
    document.getElementById('deckContainer').innerHTML = `<div class="card">${pickedCard.card}</div>`;
}

// Function to choose a side and display the result
function chooseSide() {
    chosenSide = document.getElementById('side').value;

    // Determine the side of the picked card
    let pickedCardSide = Math.random() < 0.5 ? 'andar' : 'bahar';

    document.getElementById('selectedCard').innerHTML = `<div class="card">${pickedCard.card} (${pickedCardSide.toUpperCase()})</div>`;

    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('resultArea').classList.remove('hidden');

    if (pickedCardSide === chosenSide) {
        document.getElementById('result').innerText = 'Congratulations! You win.';
    } else {
        document.getElementById('result').innerText = 'Sorry! You lose.';
    }

    // Clear the chosen side
    chosenSide = '';
}

// Function to start a new game
function startNewGame() {
    document.getElementById('gameArea').classList.remove('hidden');
    document.getElementById('resultArea').classList.add('hidden');
    document.getElementById('deckContainer').innerHTML = '';
    document.getElementById('selectedCard').innerHTML = '';
    pickedCard = '';
}
// andharbhar.js

function exitGame() {
    history.back();
}
