class Game {
  constructor() {
    this.intervalId = null;
    this.timer = 1100;
    this.carFrequency = 30;
    this.carsArr = [];
    this.refreshRate = 1000 / 100;
    this.dog = null;
  }

  start() {
    // Create dog
    this.dog = new Dog();
    this.dog.domElement = this.createElm(this.dog);
    this.drawElm(this.dog);
    this.addEventListeners();

    // Cars loop
    this.intervalId = setInterval(() => {
      // Create new cars
      this.timer--;
      if (this.timer % this.carFrequency === 0) {
        const newCar = new Car();
        newCar.setSettings(newCar);
        this.carsArr.push(newCar);
        newCar.domElement = this.createElm(newCar);
        this.drawElm(newCar);
      }

      // Move / remove cars
      this.carsArr.forEach((car) => {
        car.moveCar();
        this.drawElm(car);
        this.detectCollision(car);
        this.removeCar(car);
      });

      // Set timer
      this.printTimer();
      this.detectLose();

    }, this.refreshRate);
  }
  // Move dog
  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.dog.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.dog.moveRight();
      } else if (event.key === "ArrowUp") {
        this.dog.moveUp();
      } else if (event.key === "ArrowDown") {
        this.dog.moveDown();
      }
      this.drawElm(this.dog);
      this.detectWin(this.dog);
    });
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
      this.carsArr.shift(car);
    } else if (car.positionY % 20 !== 0 && car.positionX === 100) {
      car.domElement.remove();
      this.carsArr.shift(car);
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
      clearInterval(this.intervalId);
      gameOver.classList.remove("hide");
    }
  }

  detectLose(){
    if(this.timer === 99){
      clearInterval(this.intervalId);
      gameOver.classList.remove("hide");
    }
  }

  detectWin() {
    if (this.dog.positionY === 0) {
        clearInterval(this.intervalId);
        youWin.classList.remove("hide");
        const points = document.querySelector("#points");
        points.innerHTML = Math.floor(this.timer);
    }
  }

  printTimer(){
    let timer = document.querySelector('#timer');
    timer.innerHTML = Math.floor(this.timer / 100);
  }
}
