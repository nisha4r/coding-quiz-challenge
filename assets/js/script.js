
var question = document.querySelectorAll("main > section");
var nextPageId = 1;
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var answerButton = document.querySelectorAll("li > button");
var submitScore = document.querySelector("#submit");
var viewHighScoreEl = document.querySelector(".view-score");
var backBtn = document.querySelector("#back");
var correctEl = document.querySelector("#correct");
var wrongEl = document.querySelector("#wrong");
var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;



// Array of words the user will guess
var answer = ["0","0","3", "2", "4", "3", "4"];

submitScore.addEventListener("click", nextPage);

viewHighScoreEl.addEventListener("click", function () {

  question.forEach(function (el) {
    el.style.display = 'none';
  });
  question[7].style.display = "block";
  backBtn.addEventListener("click", currentPage)
});

// The init function is called when the page loads 
function init() {
  correctEl.style.display = "none";
  wrongEl.style.display = "none";
  question.forEach(function (el) {
    el.style.display = 'none';
  });
  question[0].style = "block";
  for (i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener("click", waitForNextPage);

  }
  //startButton.addEventListener("click", nextPage);
  getWins();
  getlosses();
}

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  isWin = false;
  timerCount = 50;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  debugger;
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
}

function showWrong() {
  correctEl.style.display = "none";
  wrongEl.style.display = "block";
}


function nextPage() {
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

  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {

  loseCounter++
  startButton.disabled = false;
  setLosses()
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
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  //win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  //lose.textContent = loseCounter;
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
  setLosses()
}
