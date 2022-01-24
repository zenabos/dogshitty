const board = document.querySelector("#board");
const youWin = document.querySelector("#win");
const gameOver = document.querySelector("#gameover");
const playAgainBtn = document.querySelector("#playagainbtn");
const tryAgainBtn = document.querySelector("#tryagainbtn");

window.addEventListener("load", () => {
  const game = new Game();
  game.start();
});

playAgainBtn.addEventListener("click", () => {
  restart();
});

tryAgainBtn.addEventListener("click", () => {
  restart();
});

function restart() {
  window.location.reload();
  const game = new Game();
  game.start();
}
