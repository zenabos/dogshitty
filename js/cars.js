class Car {
  constructor(speed) {
    this.className = "car";
    this.positionY = Math.floor(Math.random() * 7 + 2) * 10;
    this.positionX = null;
    this.move = null;
    this.width = 15;
    this.height = 10;
    this.speed = speed;
  }

  setSettings() {
    if (this.positionY % 20 === 0) {
      this.positionX = 100;
      this.move = -1 * this.speed;
    } else {
      this.positionX = -10;
      this.move = 1 * this.speed;
      this.className = "car forward";
    }
  }

  moveCar() {
    this.positionX += this.move;
  }
}
