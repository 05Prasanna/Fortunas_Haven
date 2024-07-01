// Card suits and values
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// DOM elements
const playerHand = document.getElementById('player-cards');
const dealerHand = document.getElementById('dealer-cards');
const playerScoreDisplay = document.getElementById('player-score');
const dealerScoreDisplay = document.getElementById('dealer-score');
const gameStatusDisplay = document.getElementById('game-status');
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

// Variables
let deck = [];
let playerHandValue = 0;
let dealerHandValue = 0;
let playerHandCards = [];
let dealerHandCards = [];
let gameOver = false;

// Initialize game
function initGame() {
  createDeck();
  shuffleDeck();
  playerHandValue = 0;
  dealerHandValue = 0;
  playerHandCards = [];
  dealerHandCards = [];
  gameStatusDisplay.textContent = '';
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  playerHand.innerHTML = '';
  dealerHand.innerHTML = '';
  updateScores();
}

// Create deck of cards
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      let card = {
        suit: suit,
        value: value
      };
      deck.push(card);
    }
  }
}

// Shuffle deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal initial cards
function deal() {
  if (!gameOver) {
    dealPlayerCard();
    dealDealerCard();
    dealPlayerCard();
    dealDealerCard();
    updateScores();
    dealButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    checkInitialBlackjack();
  }
}

// Deal a card to player
function dealPlayerCard() {
  const card = deck.pop();
  playerHandCards.push(card);
  const cardImage = document.createElement('img');
  cardImage.src = `images/cards/${card.value}_of_${card.suit}.png`;
  playerHand.appendChild(cardImage);
  updatePlayerScore();
}

// Deal a card to dealer
function dealDealerCard() {
  const card = deck.pop();
  dealerHandCards.push(card);
  const cardImage = document.createElement('img');
  cardImage.src = `images/cards/${card.value}_of_${card.suit}.png`;
  dealerHand.appendChild(cardImage);
  updateDealerScore();
}

// Update player score
function updatePlayerScore() {
  playerHandValue = calculateHandValue(playerHandCards);
  playerScoreDisplay.textContent = `Score: ${playerHandValue}`;
}

// Update dealer score
function updateDealerScore() {
  dealerHandValue = calculateHandValue(dealerHandCards);
  dealerScoreDisplay.textContent = `Score: ${dealerHandValue}`;
}

// Calculate hand value
function calculateHandValue(hand) {
  let handValue = 0;
  let hasAce = false;
  for (let card of hand) {
    if (card.value === 'A') {
      hasAce = true;
    }
    handValue += getCardNumericValue(card.value);
  }
  if (hasAce && handValue + 10 <= 21) {
    handValue += 10;
  }
  return handValue;
}

// Get numeric value of card
function getCardNumericValue(cardValue) {
  if (cardValue === 'A') return 1; // Ace initially counts as 1
  else if (['J', 'Q', 'K'].includes(cardValue)) return 10;
  else return parseInt(cardValue);
}

// Check for initial blackjack (Ace + 10-value card)
function checkInitialBlackjack() {
  if (playerHandValue === 21 && playerHandCards.length === 2) {
    gameStatusDisplay.textContent = 'Blackjack! You win!';
    endGame();
  } else if (dealerHandValue === 21 && dealerHandCards.length === 2) {
    gameStatusDisplay.textContent = 'Dealer has Blackjack. You lose.';
    endGame();
  }
}

// Player hits
function hit() {
  if (!gameOver) {
    dealPlayerCard();
    if (playerHandValue > 21) {
      gameStatusDisplay.textContent = 'Bust! You lose.';
      endGame();
    }
  }
}

// Player stands
function stand() {
  if (!gameOver) {
    while (dealerHandValue < 17) {
      dealDealerCard();
    }
    if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
      gameStatusDisplay.textContent = 'You win!';
    } else if (playerHandValue < dealerHandValue) {
      gameStatusDisplay.textContent = 'You lose.';
    } else {
      gameStatusDisplay.textContent = 'It\'s a draw.';
    }
    endGame();
  }
}

// End game
function endGame() {
  gameOver = true;
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
}

// Update scores on screen
function updateScores() {
  playerScoreDisplay.textContent = `Score: ${playerHandValue}`;
  dealerScoreDisplay.textContent = `Score: ${dealerHandValue}`;
}

// Event listeners
dealButton.addEventListener('click', deal);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);

// Initialize game on load
initGame();
