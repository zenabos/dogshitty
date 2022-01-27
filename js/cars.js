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
  
  getRandomImage() {
    let imageArray = [
      {image: "../styles/images/car-1.png"},
      {image: "../styles/images/car-2.png"},
      {image: "../styles/images/car-3.png"},
      {image: "../styles/images/car-4.png"},
      {image: "../styles/images/truck.png"},
      {image: "../styles/images/bus.png"},
    ]
  
    let randomIndex = Math.floor(Math.random() * imageArray.length)
    let randomImage = imageArray[randomIndex];
    
    let img = randomImage.image;
    let url = `url('${img}')`
    return url;
    }

  setSettings() {
    if (this.positionY % 20 === 0) {
      this.positionX = 100;
      this.move = -1 * this.speed;
    } else {
      this.positionX = -10;
      this.move = 1 * this.speed;
      this.className = ("car forward");
    }
  }

  

  moveCar() {
    this.positionX += this.move;
  }
}