// variables 
let deck = [];
let pickedCard = '';
let chosenSide = '';


function createDeck() {
    let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ card: rank + ' of ' + suit });
        }
    }
   
    deck.sort(() => Math.random() - 0.5);
}

// it is used to start the shuffal the numbers i.e cards
function startGame() {
    createDeck();
    pickedCard = deck[Math.floor(Math.random() * deck.length)]; // Pick a random card from the deck
    document.getElementById('deckContainer').classList.remove('hidden');
    document.getElementById('deckContainer').innerHTML = `<div class="card">${pickedCard.card}</div>`;
}

// thei is to chose the side from two sides
function chooseSide() {
    chosenSide = document.getElementById('side').value;

    
    let pickedCardSide = Math.random() < 0.5 ? 'andar' : 'bahar';

    document.getElementById('selectedCard').innerHTML = `<div class="card">${pickedCard.card} (${pickedCardSide.toUpperCase()})</div>`;

    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('resultArea').classList.remove('hidden');

    if (pickedCardSide === chosenSide) {
        document.getElementById('result').innerText = 'Congratulations! You win.';
    } else {
        document.getElementById('result').innerText = 'Sorry! You lose.';
    }

    
    chosenSide = '';
}
//all the functions which are from which the buttons are working

function startNewGame() {
    document.getElementById('gameArea').classList.remove('hidden');
    document.getElementById('resultArea').classList.add('hidden');
    document.getElementById('deckContainer').innerHTML = '';
    document.getElementById('selectedCard').innerHTML = '';
    pickedCard = '';
}

//to exit 
function exitGame() {
    history.back();
}
