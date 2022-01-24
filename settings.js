const board = document.querySelector('#board')
const startScreen = document.querySelector('#start');
const youWin = document.querySelector('#win');
const gameOver = document.querySelector('#game-over');
const startBtn = document.querySelector('#startbtn');
const playAgainBtn = document.querySelector('#playagainbtn');
const tryAgainBtn = document.querySelector('#tryagainbtn');

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hide');
  const game = new Game();
  game.start(); 
})

playAgainBtn.addEventListener('click',() => {
  youWin.classList.add('hide');
  const game = new Game();
  game.restart();
})

tryAgainBtn.addEventListener('click', () => {
  gameOver.classList.add('hide');
  const game = new Game();
  game.restart(); 
})