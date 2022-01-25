// Settings for starting game

// Get popups
const board = document.querySelector("#board");
const startScreen = document.querySelector("#start");
const youWin = document.querySelector("#win");
const gameOver = document.querySelector("#gameover");

// Get buttons
const startBtn = document.querySelector("#startbtn");
const tryAgainBtn = document.querySelector("#tryagainbtn");
const nextLevelBtn = document.querySelector("#nextlevelbtn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  const game = new Game();
  game.start();
});

tryAgainBtn.addEventListener("click", () => {
  gameOver.classList.add("hide");
  const game = new Game();
  game.start();
});

nextLevelBtn.addEventListener("click", () => {
  youWin.classList.add("hide");
  const game = new Game();
  game.start();
});
