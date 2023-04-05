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

/*Modal*/

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    let modal = document.querySelector(".modal--show");
    modal.classList.remove("modal--show");
    hideModalBg();
  }
});

const modalBackground = document.createElement("div");
modalBackground.classList.add("modal-background");
document.body.appendChild(modalBackground);
modalBackground.style.display = "none";

const modals = document.querySelectorAll("section.modal");
for (let i = 0; i < modals.length; i++) {
  modals[i].setAttribute("data-modalref", `${i}`);
  
  const tempContent = modals[i].innerHTML;
  modals[i].innerHTML = "";
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");
  modals[i].insertAdjacentElement("afterbegin", modalContent);
  modalContent.innerHTML = tempContent;

  const modalCloseIcon = document.createElement("div");
  modalCloseIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>';
  modalCloseIcon.classList.add("modal__close");
  modalCloseIcon.addEventListener("click", closeModal);
  modals[i].appendChild(modalCloseIcon);
}

const modalTriggers = document.querySelectorAll('[data-modaltrg]');
for(let i = 0; i < modalTriggers.length; i++) {
  modalTriggers[i].addEventListener("click", showModal);
  const modalName = modalTriggers[i].getAttribute("data-modaltrg");
  const modal = document.querySelector(`[data-modal=${modalName}]`);
    modalTriggers[i].setAttribute("data-modalref", modal.getAttribute("data-modalref"));
}

function closeModal() {
  this.parentElement.classList.remove("modal--show");
  hideModalBg();
}

function showModal() {
  modals[Number(this.getAttribute("data-modalref"))].classList.add("modal--show");
  showModalBg();
}

function showModalBg() {
  modalBackground.style.display = "block";
}

function hideModalBg() {
  modalBackground.style.display = "none";
}