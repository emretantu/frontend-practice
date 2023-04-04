"use strict"

const gameRule = {
  upperLimit: 20,
  lowerLimit: 1,
  scoreBase: 10,
  scoreSteps: 1,
  isAutoRestartActive: true,
  autoRestartTime: 3000
}

const gameUI = {
  numb: document.querySelector(".game__number"),
  guessedNumber: document.querySelector(".game__guessed-number"),
  btnGuess: document.querySelector(".game__button--guess"),
  btnReset: document.querySelector(".game__button--reset"),
  msg: document.querySelector(".game__msg"),
  gameScore: document.querySelector(".game__score"),
  bestScore: document.querySelector(".game__best-score")
}

let numb;
let score;
let bestScore = 0;

gameUI.btnGuess.addEventListener("click", guess);
gameUI.btnReset.addEventListener("click", reset);
window.addEventListener("keypress", (e) => {
  if (e.code === "KeyG" || e.code === "Enter") {
    guess();
  } else if (e.code === "KeyR") {
    reset();
  }
})

function getRandom() {
  return Math.floor(Math.random() * (gameRule.upperLimit - gameRule.lowerLimit + 1) + gameRule.lowerLimit);
}

function setMsg(msg) {
  gameUI.msg.textContent = msg
}

function decreaseScore() {
  score -= gameRule.scoreSteps;
  if (score <= 0) {
    score = 0;
  }
  gameUI.gameScore.textContent = String(score);
  gameUI.numb.classList.add("game__number--false");
  setTimeout(() => {gameUI.numb.classList.remove("game__number--false")}, 220)
}

function win() {
  setMsg("🎉 You found it!");
  gameUI.numb.textContent = String(numb);
  if (score > bestScore) {
    bestScore = score;
    gameUI.bestScore.textContent = bestScore;
  }
  gameUI.numb.classList.add("game__number--true");
  setTimeout(() => {gameUI.numb.classList.remove("game__number--true")}, 1000)
  inactivateGame();
  restartGame();
}

function defeat() {
  setMsg("💥 You loose!");
  inactivateGame();
  restartGame();
}

function activateGame() {
  gameUI.btnGuess.classList.remove("game__button--inactive");
  gameUI.btnGuess.classList.add("game__button--guess");
}

function inactivateGame() {
  gameUI.btnGuess.classList.add("game__button--inactive");
  gameUI.btnGuess.classList.remove("game__button--guess");
}

function restartGame() {
  if(!gameRule.isAutoRestartActive) return;
  gameUI.btnReset.classList.add("game__button--inactive");
  gameUI.btnReset.classList.remove("game__button--reset");
  setTimeout(() => {
    setMsg("Restart in " + Math.round(gameRule.autoRestartTime / 1000) + " second(s).");
  }, gameRule.autoRestartTime > 4000 ? 2000 : gameRule.autoRestartTime / 2);
  setTimeout(() => {
    gameUI.btnReset.classList.remove("game__button--inactive");
    gameUI.btnReset.classList.add("game__button--reset");
    reset()
  }, gameRule.autoRestartTime);
}

function guess() {
  let input = gameUI.guessedNumber.value;
  if (input === "") {
    setMsg("❌ No number!");
    return;
  }
  input = Number(input);
  if (input === numb) {
    win();
  } else {
    if (input < numb) {
    setMsg("⬆ Higher!");
    } else {
    setMsg("⬇ Lower!");
    }
    decreaseScore();
    if (score <= 0) {
      defeat();
    }
  }
  gameUI.guessedNumber.focus();
}

function reset() {
  gameUI.numb.textContent = "?";
  gameUI.numb.style.setProperty("--range", `"${gameRule.lowerLimit} - ${gameRule.upperLimit}"`);
  gameUI.guessedNumber.value = "";
  gameUI.msg.textContent = "What's your first guess?";
  gameUI.gameScore.textContent = gameRule.scoreBase;
  activateGame();
  numb = getRandom();
  score = gameRule.scoreBase;
  gameUI.guessedNumber.focus(); /*guessedNumber must be focused on each reset. That's why input.game__guessed-number don't have autofocus.*/
}

reset();