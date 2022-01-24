class Car {
  constructor() {
    this.className = "car";
    this.positionY = Math.floor(Math.random() * 8 + 1) * 10;
    this.positionX = null;
    this.move = null;
    this.width = 10;
    this.height = 10;
  }

  setSettings() {
    if (this.positionY % 20 === 0) {
      this.positionX = 100;
      this.move = -1;
    } else {
      this.positionX = -10;
      this.move = 1;
    }
  }

  moveCar() {
    this.positionX += this.move;
  }
}
