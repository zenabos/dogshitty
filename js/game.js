class Game {
  constructor() {
    this.controller = new AbortController();
    this.intervalId = null;
    this.timer = 1100;
    this.carsArr = [];
    this.refreshRate = 1000 / 100;

    this.level = 1;
    this.speed = 1;
    this.carFrequency = 30;
  }

  start() {
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
      if (this.timer % this.carFrequency === 0) {
        const newCar = new Car();
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
          this.dog.domElement.classList.add("left");
        } else if (event.key === "ArrowRight") {
          this.dog.moveRight();
          this.dog.domElement.classList.remove("left");
        } else if (event.key === "ArrowUp") {
          this.dog.moveUp();
          this.dog.domElement.classList.add("left");
        } else if (event.key === "ArrowDown") {
          this.dog.moveDown();
          this.dog.domElement.classList.remove("left");
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
    if (car.positionY % 20 === 0 && car.positionX === -10) {
      car.domElement.remove();
    } else if (car.positionY % 20 !== 0 && car.positionX === 100) {
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
      this.stopGame();
      youWin.classList.remove("hide");
      const points = document.querySelector("#points");
      const scoreboard = document.querySelector("#scoreboard");
      points.innerHTML = Math.floor(this.timer);
      scoreboard.innerHTML = Math.floor(this.timer);
    }
  }

  printTimer() {
    let timer = document.querySelector("#timer");
    timer.innerHTML = Math.floor(this.timer / 100);
  }

  stopGame() {
    clearInterval(this.intervalId);
    board.innerHTML = "";
    this.controller.abort();
  }
}
