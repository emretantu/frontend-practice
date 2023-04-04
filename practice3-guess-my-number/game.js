"use strict"

const gameRule = {
  upperLimit: 20,
  lowerLimit: 1,
  scoreBase: 10,
  scoreSteps: 1,
  isAutoRestartActive: false,
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

console.log(gameUI);

gameUI.btnGuess.addEventListener("click", guess);
gameUI.btnReset.addEventListener("click", reset);

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
}

function win() {
  setMsg("🎉 You found it!");
  gameUI.numb.textContent = String(numb);
  if (score > bestScore) {
    bestScore = score;
    gameUI.bestScore.textContent = bestScore;
  }
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
    gameUI.btnReset.classList.add("game__button--inactive");
    gameUI.btnReset.classList.remove("game__button--reset");
  }, gameRule.autoRestartTime > 4000 ? 2000 : gameRule.autoRestartTime / 2);
  setTimeout(reset, gameRule.autoRestartTime)
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
}

reset();