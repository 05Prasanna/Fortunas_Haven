function playGame(playerChoice) {// logic of the game
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
    } else {
        result = 'You lose!';
    }

    document.getElementById('result').textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
}
// to reset the game
function resetGame() {
    document.getElementById('result').textContent = 'Choose your move...';
}
//exit game
function exitGame() {
    history.back();
}