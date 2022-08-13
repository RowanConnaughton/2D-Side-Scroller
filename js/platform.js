export class Platform {
  constructor(game) {
    this.game = game;
    this.width = 839;
    this.height = 231;
    this.x = this.game.width / 2;
    this.y = this.game.height * 0.4;
    this.image = document.getElementById("platform");
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
