
var question = document.querySelectorAll("main > section");
var nextPageId = 1;
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var answerButton = document.querySelectorAll("li > button");
var submit = document.querySelector("#submit");
var userInput = document.querySelector("#username");
var viewHighScoreEl = document.querySelector(".view-score");
var backBtn = document.querySelector("#back");
var correctEl = document.querySelector("#correct");
var wrongEl = document.querySelector("#wrong");
var score = document.querySelector("#score");
var viewHighScoreEl = document.querySelector("#highscore");
var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;
var highScore = 0;



// Array of words the user will guess
var answer = ["0", "0", "3", "2", "4", "3", "4"];



viewHighScoreEl.addEventListener("click", function () {

  question.forEach(function (el) {
    el.style.display = 'none';
  });
  question[7].style.display = "block";
  backBtn.addEventListener("click", currentPage)
});

// hide answer response for next page
function hideAnswerResponse() {
  correctEl.style.display = "none";
  wrongEl.style.display = "none";
}

// The init function is called when the page loads 
function init() {
  hideAnswerResponse();
  question.forEach(function (el) {
    el.style.display = 'none';
  });
  question[0].style = "block";
  for (i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener("click", waitForNextPage);

  }
  //startButton.addEventListener("click", nextPage);
  resetWin();

}

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  isWin = false;
  timerCount = 50;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;

  nextPage();
  startTimer()

}




var previous = 0;
function waitForNextPage() {

  setTimeout(nextPage, 2000);


}

function showCorrect() {
  correctEl.style.display = "block";
  wrongEl.style.display = "none";
  winGame();
}

function showWrong() {
  correctEl.style.display = "none";
  wrongEl.style.display = "block";
  loseGame();
}


function nextPage() {
  hideAnswerResponse();
  hidePrevious();
  if (nextPageId < question.length) {
    question[nextPageId].setAttribute("style", "display: block");
    previous = nextPageId;
    nextPageId++;

  }
}

function currentPage() {
  question[7].style.display = "none";
  --nextPageId;
  if (nextPageId < question.length) {
    question[nextPageId].setAttribute("style", "display: block");
    previous = nextPageId;
  }

}

function hidePrevious() {
  if (previous >= 0 && previous < question.length) {
    question[previous].setAttribute("style", "display: none");

  }

}

// The winGame function is called when the win condition is met
function winGame() {

  winCounter += 10;
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {

  timerCount -= 10;
  startButton.disabled = false;

}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}



// Updates win count on screen and sets win count to client storage
function setWins() {
  score.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

submit.addEventListener("click", submitScore);
function submitScore() {
  var user = userInput.value;
  localStorage.setItem(user, winCounter);
  nextPage();
  getAllScores();
}


// resetWin
function resetWin() {

  localStorage.setItem("winCount", 0);
  winCounter = 0;
  score.textContent = 0;
}





// Validate answer after button click
function validateAnswer(event) {
  question[8].style.display = "block";

  var content = event.textContent.split(".");
  console.log(content[0]);
  if (answer[nextPageId] == content[0]) {
    showCorrect();
  } else {
    showWrong();
  }
}



// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()

}

function getAllScores() {

  for (var i = 0; i < localStorage.length; i++) {

    // set iteration key name
    var key = localStorage.key(i);

    // use key name to retrieve the corresponding value
    var value = localStorage.getItem(key);

    highScore = Math.max(value, highScore);


  }

  viewHighScoreEl.textContent = highScore;
}