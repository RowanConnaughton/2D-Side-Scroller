export class PowerUp {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 108;
    this.x = this.game.width;
    this.y = this.game.height * Math.random();
    this.image = document.getElementById("powerup");
    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.game.speed;
    //check if off screen
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
