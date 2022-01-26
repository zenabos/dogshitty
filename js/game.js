let game;

class Game {
  constructor() {
    this.intervalId = null;
    this.timer = 1100;
    this.carsArr = [];
    this.refreshRate = 1000 / 100;
    this.level = 1;
    this.score = 0;
    this.speed = 1;
    this.carFrequency = 60;
  }

  setSettings() {
    this.timer = 1100;
    this.carsArr = [];
    scoreboard.innerHTML = this.score;
    level.innerHTML = this.level;
  }

  start() {
    //(re)set settings
    this.setSettings();
    this.controller = new AbortController();

    // Create dog
    this.dog = new Dog();
    this.dog.domElement = this.createElm(this.dog);
    this.drawElm(this.dog);
    this.addEventListeners();

    // Game loop
    this.intervalId = setInterval(() => {
      // Set timer
      this.timer--;
      this.printTimer();
      this.runOutOfTime();

      // Create new cars
      if (this.timer % (this.carFrequency / this.level) === 0) {
        const newCar = new Car(this.speed * (this.level * 0.75));
        newCar.setSettings(newCar);
        this.carsArr.push(newCar);
        newCar.domElement = this.createElm(newCar);
        this.drawElm(newCar);
      }

      // Car loop (move/remove)
      this.carsArr.forEach((car) => {
        car.moveCar();
        this.drawElm(car);
        this.detectCollision(car);
        this.removeCar(car);
      });
    }, this.refreshRate);
  }

  // Move dog
  addEventListeners() {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "ArrowLeft") {
          this.dog.moveLeft();
          this.dog.domElement.className = "left dog";
        } else if (event.key === "ArrowRight") {
          this.dog.moveRight();
          this.dog.domElement.className = "right dog";
        } else if (event.key === "ArrowUp") {
          this.dog.moveUp();
          this.dog.domElement.className = "dog";
        } else if (event.key === "ArrowDown") {
          this.dog.moveDown();
          this.dog.domElement.className = "dog";
        }
        this.drawElm(this.dog);
        this.detectWin(this.dog);
      },
      { signal: this.controller.signal }
    );
  }

  // Create element(s)
  createElm(element) {
    const htmlTag = document.createElement("div");
    htmlTag.className = element.className;
    htmlTag.style.width = element.width + "vw";
    htmlTag.style.height = element.height + "vh";
    const board = document.getElementById("board");
    board.appendChild(htmlTag);
    return htmlTag;
  }

  drawElm(element) {
    element.domElement.style.top = element.positionY + "vh";
    element.domElement.style.left = element.positionX + "vw";
  }

  // Remove elements (cars)
  removeCar(car) {
    if (car.positionY % 20 === 0 && car.positionX <= -5) {
      car.domElement.remove();
    } else if (car.positionY % 20 !== 0 && car.positionX >= 95) {
      car.domElement.remove();
    }
  }

  // Detect win or lose
  detectCollision(car) {
    if (
      this.dog.positionX < car.positionX + car.width &&
      this.dog.positionX + this.dog.width > car.positionX &&
      this.dog.positionY < car.positionY + car.height &&
      this.dog.height + this.dog.positionY > car.positionY
    ) {
      this.stopGame();
      gameOver.classList.remove("hide");
    }
  }

  runOutOfTime() {
    if (this.timer === 99) {
      this.stopGame();
      gameOver.classList.remove("hide");
    }
  }

  detectWin() {
    if (this.dog.positionY === 10) {
      setTimeout(() => {
        this.stopGame();

        this.level++;
        this.score = this.score + Math.floor(this.timer);

        this.printPoints();
        youWin.classList.remove("hide");
      }, 300);
    }
  }

  printTimer() {
    let timer = document.querySelector("#timer");
    timer.innerHTML = Math.floor(this.timer / 100);
  }

  printPoints() {
    points.innerHTML = this.score;
  }

  stopGame() {
    clearInterval(this.intervalId);
    board.innerHTML = "";
    this.controller.abort();
  }
}

// Get popups
const startScreen = document.querySelector("#start");
const gameOver = document.querySelector("#gameover");
const youWin = document.querySelector("#win");
const points = document.querySelector("#points");

// Get infoboards
const info = document.querySelectorAll(".info");
const level = document.querySelector("#level");
const scoreboard = document.querySelector("#scoreboard");

// Get buttons
const startBtn = document.querySelector("#startbtn");
const nextLevelBtn = document.querySelector("#nextlevelbtn");
const tryAgainBtn = document.querySelector("#tryagainbtn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  game = new Game();
  game.start();
  info.forEach((box) => box.classList.remove("hide"));
});

nextLevelBtn.addEventListener("click", () => {
  youWin.classList.add("hide");
  game.start();
});

tryAgainBtn.addEventListener("click", () => {
  gameOver.classList.add("hide");
  game = new Game();
  game.start();
});
