class Dog {
  constructor() {
    this.className = "dog";
    this.positionX = 50;
    this.positionY = 90;
    this.width = 10;
    this.height = 10;
    this.moveAudio = new Audio("sounds/move.wav");
    this.moveAudio.volume = 0.6;
  }

  moveLeft() {
    if (this.positionX === 0) {
      return this.positionX;
    }
    this.positionX -= 10;
    this.moveAudio.play();
  }

  moveRight() {
    if (this.positionX === 90) {
      return this.positionX;
    }
    this.positionX += 10;
    this.moveAudio.play();
  }

  moveUp() {
    if (this.positionY === 10) {
      return this.positionY;
    }
    this.positionY -= 10;
    this.moveAudio.play();
  }

  moveDown() {
    if (this.positionY === 90) {
      return this.positionY;
    }
    this.positionY += 10;
    this.moveAudio.play();
  }
}
