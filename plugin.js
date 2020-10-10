var n = (localStorage.getItem("range"))? localStorage.getItem("range") : 100;
var level = (localStorage.getItem("level"))? localStorage.getItem("level") : "Easy";
var correctNumber = getRandomNumber(n);
var guesses = [];
const rangeNumberButtons = document.querySelectorAll(".game__number__range");
const levelButtons = document.querySelectorAll(".game__level");
console.log(correctNumber);

window.onload = function () {
  handleShowGameBox();
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);
  document.getElementById("start_game").addEventListener("click", startGame);
  document.getElementById("play_again").addEventListener("click", playGameAgain);
  document.getElementById("exit_game").addEventListener("click", exitGame);
  document.getElementById("open_about_me").addEventListener("click", openAboutMe);
  document.querySelector(".close_about_game").addEventListener("click", closeAboutMe);
  // to get range numbers
  optionsControlClick(rangeNumberButtons);
  // to get level
  optionsControlClick(levelButtons);

  //handle hover of level easy and hard
  handleHoverMessages();

};

function openAboutMe(){
  document.getElementById("about_game").style.top = "0px";
}
function closeAboutMe(){
  document.getElementById("about_game").style.top = "-3000px";
}

// function takes array of elements and handle active class and n value and level
function optionsControlClick(elements){
  for (let i = 0; i < elements.length; i++){
    elements[i].onclick = function(){
      var el = elements[0];
      while(el){
        if(el.tagName === "DIV"){
          el.classList.remove("active");
        }
        el = el.nextSibling;
      }
      this.classList.add("active");
      if(this.classList.contains("game__number__range")){
        n = +this.textContent;
        console.log(n);
      }else if(this.classList.contains("game__level")){
        level = this.textContent;
        console.log(level);
      }
    }
  }
}



function playGame() {
  let inputGuess = document.getElementById("number-guess");
  let numberGuess = inputGuess.value;

  if (numberGuess === "" || isNaN(numberGuess)) {
    shakeInput("number-guess");
    inputGuess.focus();
    return;
  }
  console.log(correctNumber);
  saveGuessHistory(numberGuess);
  displayResults(numberGuess);
  if(level === "Easy"){
    displayHistory();
  }

  inputGuess.value = "";
  inputGuess.focus();
  
}
//handle Enter button to guess input
document.getElementById("number-guess").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("number-submit").click();
  }
});

function startGame() {
  let inputUsername = document.getElementById("username");
  let username = inputUsername.value;

  if (username === "" || !isNaN(username)) {
    shakeInput("username");
    return;
  }
  localStorage.setItem("username", username);
  localStorage.setItem("level", level);
  localStorage.setItem("range", n);
  correctNumber = getRandomNumber(n);

  hideUserSection();
  showGameBox();
  document.getElementById("number-guess").focus();
  inputUsername.value = "";
}



function hideUserSection() {
  document.querySelector(".game__user__info").style.display = "none";
}
function showUserSection() {
  document.querySelector(".game__user__info").style.display = "block";
}
function hideGameBox() {
  document.querySelector(".game__box").style.display = "none";
}
function showGameBox() {
  document.querySelector(".game__box").style.display = "block";
}

// show or hide game box depends on localstorage username
function handleShowGameBox() {
  if (localStorage.getItem("username") === null) {
    showUserSection();
    hideGameBox();
    document.getElementById("username").focus();
  } else {
    showGameBox();
    hideUserSection();
    document.getElementById("number-guess").focus();
  }
}

//show easy_message when hover
function showEasyMessage() {
  document.getElementById("message_easy").style.opacity = "1";
}
function hideEasyMessage() {
  document.getElementById("message_easy").style.opacity = "0";
}

function showHardMessage() {
  document.getElementById("message_hard").style.opacity = "1";
}
function hideHardMessage() {
  document.getElementById("message_hard").style.opacity = "0";
}

function handleHoverMessages() {
  document
    .getElementById("level_easy")
    .addEventListener("mouseenter", showEasyMessage);
  document
    .getElementById("level_easy")
    .addEventListener("mouseleave", hideEasyMessage);
  document
    .getElementById("level_hard")
    .addEventListener("mouseenter", showHardMessage);
  document
    .getElementById("level_hard")
    .addEventListener("mouseleave", hideHardMessage);
}

//Make random number
function getRandomNumber(r) {
  return Math.floor(Math.random() * r);
}

//displayResults
function displayResults(numberGuess) {
  if (numberGuess > correctNumber) {
    showNumberAbove();
    shakeResult(".game__wrong");
  } else if (numberGuess < correctNumber) {
    showNumberBelow();
    shakeResult(".game__wrong");
  } else if (numberGuess == correctNumber) {
    showYouWon();
    showPopupWinner();
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
}

// function to display history
function displayHistory() {
  const historyBox = document.getElementById("history");
  let history = "";
  let reversedArray = [...guesses];
  reversedArray.reverse().map((item) => {
    history += `<p class="game__history__record">
      You guessed 
      <span>${item}</span></p>`;
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
  correctNumber = getRandomNumber(n);
  guesses = [];
  document.getElementById("result").innerHTML = "";
  displayHistory();
}

function playGameAgain(){
  initGame();
  hidePopupWinner();
}

function exitGame(){
  localStorage.removeItem("username");
  localStorage.removeItem("level");
  localStorage.removeItem("range");
  initGame();
  hidePopupWinner();
  showUserSection();
  hideGameBox();
}

function shakeInput(idName) {
  const input = document.getElementById(idName);
  input.classList.add("shake");
  setTimeout(() => {
    input.classList.remove("shake");
  }, 600);
}
function shakeResult(className) {
  const input = document.querySelector(className);
  input.classList.add("shake_result");
  setTimeout(() => {
    input.classList.remove("shake_result");
  }, 600);
}

// show popup winner
function showPopupWinner(){
  let username = localStorage.getItem('username');
  let tries = guesses.length;
  // let gifs = ["winning_banner1.gif", "winning_banner2.gif", "winning_banner3.gif"];
  // arr[Math.floor(Math.random() * arr.length)]
  let randomNumber = Math.ceil(Math.random() * 4);

  let gifElem = `<img class="winner_banner" src="./images/winning_banner${randomNumber}.gif" alt="winning banner">`

  document.getElementById("display_username").textContent = username;
  document.getElementById("number_tries").textContent = tries;
  document.getElementById("popup_banner").innerHTML = gifElem;

  setTimeout(()=>{
    document.getElementById('popup_winner').style.display = "block";
  }, 600)
}
// hide popup winner
function hidePopupWinner(){
  document.getElementById('popup_winner').style.display = "none";
}