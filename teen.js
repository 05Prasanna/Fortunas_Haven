// script.js
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCards(deck, numPlayers, cardsPerPlayer) {
    let hands = [];
    for (let i = 0; i < numPlayers; i++) {
        hands.push(deck.splice(0, cardsPerPlayer));
    }
    return hands;
}

function renderCards(player, cards) {
    const cardsDiv = document.querySelector(`#${player} .cards`);
    cardsDiv.innerHTML = "";
    cards.forEach(card => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerText = card.value;
        cardsDiv.appendChild(cardDiv);
    });
}

function determineWinner(hands) {
    // Simple logic to determine winner based on highest card value
    let winner = 0;
    let highestValue = 0;
    hands.forEach((hand, index) => {
        hand.forEach(card => {
            let cardValue = values.indexOf(card.value) + 1;
            if (cardValue > highestValue) {
                highestValue = cardValue;
                winner = index + 1;
            }
        });
    });
    return `Player ${winner} wins!`;
}

document.getElementById("dealBtn").addEventListener("click", () => {
    const deck = shuffleDeck(createDeck());
    const hands = dealCards(deck, 2, 3);
    renderCards("player1", hands[0]);
    renderCards("player2", hands[1]);
    document.getElementById("result").innerText = determineWinner(hands);
});
