export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 40;
    this.fontFamily = "ReggaeOne";
    this.width = 350;
    this.height = 150;
    this.image = document.getElementById("scoreBG");
    this.livesImage = document.getElementById("lives");
  }

  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlgin = "left";
    context.fillStyle = this.game.fontColor;

    context.drawImage(this.image, 0, 0, this.width, this.height);
    //score
    context.fillText("Score: " + this.game.score, 25, 50);

    //lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 60 * i + 20, 85, 50, 47);
    }
  }
}
