var correctNumber = getRandomNumber(100);
var guesses = [];

window.onload = function () {
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);
};

function playGame() {
  let inputGuess = document.getElementById("number-guess");
  let numberGuess = inputGuess.value;

  console.log(numberGuess);
  console.log(correctNumber);
  displayResults(numberGuess);
  saveGuessHistory(numberGuess);
  displayHistory();

  inputGuess.value = "";
}

//Make random number
function getRandomNumber(r) {
  return Math.floor(Math.random() * r);
}

//displayResults
function displayResults(numberGuess) {
  if (numberGuess > correctNumber) {
    showNumberAbove();
  } else if (numberGuess < correctNumber) {
    showNumberBelow();
  } else if (numberGuess == correctNumber) {
    showYouWon();
  }
}

function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = `<p class="game__wrong">
        ${text}
        <img class="game__icon" src="./images/wrong.png" alt="wrong" />
      </p>`;
      break;
    case "won":
      dialog = `<p class="game__correct">
          ${text}
          <img class="game__icon" src="./images/correct.png" alt="correct" />
        </p>`;
      break;
  }

  return dialog;
}

function showYouWon() {
  const text = "Woow, You got it!";
  let dialog = getDialog("won", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberAbove() {
  const text = "Your guess is too high!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow() {
  const text = "Your guess is too low!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

// function to save guess history
function saveGuessHistory(guess) {
  guesses.push(guess);
  console.log(guesses);
}

// function to display history
function displayHistory() {
  const historyBox = document.getElementById("history");
  let history = "";
  let reversedArray = [...guesses];
  reversedArray.reverse().map((item) => {
    history += `<p class="game__history__record">You guessed <span>${item}</span></p>`;
  });
  historyBox.innerHTML = history;
  if (historyBox.innerHTML === "") {
    historyBox.style.padding = "0";
  } else {
    historyBox.style.padding = "8px 0";
  }
}

// function to reset the game
function initGame() {
  correctNumber = getRandomNumber(100);
  guesses = [];
  document.getElementById("result").innerHTML = "";
  displayHistory();
}
