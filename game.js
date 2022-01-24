const board = document.querySelector('#board')
const startScreen = document.querySelector('.startscreen');
const startBtn = document.querySelector('#startbtn');
startBtn.addEventListener('click', () => {
  startScreen.className = 'hide';
  const game = new Game();
  game.start(); 
  console.log(startScreen)
})

class Game {
  constructor() {
    this.carsArrOne = [];
    this.carsArrTwo = [];
    this.carsArrThree = [];
    this.timer = 0;
    this.refreshRate = 1000 / 40;
  }
  start() {
    this.dog = new Dog();
    this.dog.domElement = this.createDomElm(this.dog);
    this.drawDomElm(this.dog);
    this.addEventListeners();

    const intervalId = setInterval(() => {
      this.timer++;
      if (this.timer % 80 === 0) {
        const newCar = new Car(-10, 30, 2);
        this.carsArrOne.push(newCar);
        newCar.domElement = this.createDomElm(newCar);
        this.drawDomElm(newCar);
      } else if (this.timer % 50 === 0) {
        const newCarTwo = new Car(110, 50, -1);
        this.carsArrTwo.push(newCarTwo);
        newCarTwo.domElement = this.createDomElm(newCarTwo);
        this.drawDomElm(newCarTwo);
      } else if (this.timer % 60 === 0) {
        const newCarThree = new Car(-10, 70, 1);
        this.carsArrThree.push(newCarThree);
        newCarThree.domElement = this.createDomElm(newCarThree);
        this.drawDomElm(newCarThree);
      }
      this.carsArrOne.forEach((car) => {
        car.moveCar();
        this.detectCollision(car);
        this.drawDomElm(car);
        this.removeCarOne(car);
      });

      this.carsArrTwo.forEach((car) => {
        car.moveCar();
        this.detectCollision(car);
        this.drawDomElm(car);
        this.removeCarTwo(car);
      });

      this.carsArrThree.forEach((car) => {
        car.moveCar();
        this.detectCollision(car);
        this.drawDomElm(car);
        this.removeCarThree(car);
      });
    }, this.refreshRate);
  }

  detectCollision(car) {
    if (
      this.dog.positionX < car.positionX + car.width &&
      this.dog.positionX + this.dog.width > car.positionX &&
      this.dog.positionY < car.positionY + car.height &&
      this.dog.height + this.dog.positionY > car.positionY
    ) {
      document.location.reload();
      startScreen.className = 'startscreen';
      startBtn.innerTEXT = 'Try again!'
    }
  }

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
      this.drawDomElm(this.dog);
      this.detectWin(this.dog);
    });
  }
  createDomElm(instance) {
    const htmlTag = document.createElement("div");
    htmlTag.className = instance.className;
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("board");
    board.appendChild(htmlTag);
    return htmlTag;
  }
  drawDomElm(instance) {
    instance.domElement.style.top = instance.positionY + "vh";
    instance.domElement.style.left = instance.positionX + "vw";
  }

  removeCarOne(car) {
    if (car.positionX === 100) {
      car.domElement.remove();
      this.carsArrOne.shift(car);
    }
  }

  removeCarTwo(car) {
    if (car.positionX === -10) {
      car.domElement.remove();
      this.carsArrTwo.shift(car);
    }
  }
  removeCarThree(car) {
    if (car.positionX === 100) {
      car.domElement.remove();
      this.carsArrThree.shift(car);
    }
  }

  detectWin() {
    if (this.dog.positionY === 0){
      setTimeout(function(){
        startScreen.className = 'startscreen';
        document.board.reload();
        startBtn.innerHTML = 'Play again'
      }, 300);
    }
  }
}



class Dog {
  constructor() {
    this.className = "dog";
    this.positionX = 50;
    this.positionY = 90;
    this.width = 10;
    this.height = 10;
    this.domElement = null;
  }

  moveLeft() {
    if (this.positionX === 0) {
      this.stopMovement(dog);
    }
    this.positionX -= 10;
  }

  moveRight() {
    if (this.positionX === 90) {
      this.stopMovement(dog);
    }
    this.positionX += 10;
  }

  moveUp() {
    if (this.positionY === 0) {
      this.stopMovement(dog);
    }
    this.positionY -= 10;
  }

  moveDown() {
    if (this.positionY === 90) {
      this.stopMovement(dog);
    }
    this.positionY += 10;
  }

  stopMovement() {
    return this.positionX && this.positionY;
  }
}

class Car {
  constructor(positionX, positionY, move) {
    this.className = "car";
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = 10;
    this.height = 10;
    this.domElement = null;
    this.move = move;
  }
  moveCar() {
    this.positionX += this.move;
  }
}
