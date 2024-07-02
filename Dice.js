function rollDice(){//logic of the game
    var prediction = parseInt(document.getElementById("predictionInput").value);
    if (prediction < 2 || prediction > 12) {
        document.getElementById("resultDisplay").innerHTML = "Please enter a valid prediction between 2 and 12.";
        return;
    }

    var dice1Value = Math.floor(Math.random() * 6) + 1;
    var dice2Value = Math.floor(Math.random() * 6) + 1;
    var sum = dice1Value + dice2Value;

    document.getElementById("dice1Value").innerHTML = dice1Value;
    document.getElementById("dice2Value").innerHTML = dice2Value;

    document.getElementById("dice1").src = "bg images/" + dice1Value + ".jpg";
    document.getElementById("dice2").src = "bg images/" + dice2Value + ".jpg";

    document.getElementById("sumDisplay").innerHTML = "Sum: " + sum;

    if (sum === prediction) {
        document.getElementById("resultDisplay").innerHTML = "You win!";
    } else {
        document.getElementById("resultDisplay").innerHTML = "You lose!";
    }
    // to exit from game
}
function exitGame() {
    history.back();
}