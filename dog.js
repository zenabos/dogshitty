class Dog {
  constructor() {
    this.className = "dog";
    this.positionX = 50;
    this.positionY = 90;
    this.width = 10;
    this.height = 10;
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
