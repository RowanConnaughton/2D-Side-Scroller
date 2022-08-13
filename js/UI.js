export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 40;
    this.fontFamily = "ReggaeOne";
    this.menuWidth = 800;
    this.menuHeight = 892;
    this.scoreWidth = 350;
    this.scoreHeight = 150;
    this.menuImage = document.getElementById("menuBG");
    this.scoreImage = document.getElementById("scoreBG");
    this.livesImage = document.getElementById("lives");
  }

  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlgin = "left";
    context.fillStyle = this.game.fontColor;

    let message1;
    let message2;
    let message3;

    if (this.game.start || this.game.gameOver) {
      //menu background
      context.drawImage(
        this.menuImage,
        this.game.width * 0.5 - 400,
        this.game.height * 0.5 - 400,
        this.menuWidth,
        this.menuHeight
      );
    }

    //Starting menu
    if (this.game.start) {
      message1 = "ENCHANTED FORREST";
      message2 = "YOUR JOURNEY BEGINGS";
      message3 = "CONTROLS";

      context.save();
      context.font = "50px " + this.fontFamily;
      context.textAlign = "center";
      context.shadowOffsetX = 5;
      context.shadowOffsetY = 5;
      context.shadowColor = "black";

      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 300
      );
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 - 240
      );

      context.fillText(
        message3,
        this.game.width * 0.5,
        this.game.height * 0.5 - 100
      );
      context.restore();

      context.fillText(
        "Arrow keys for movement",
        this.game.width * 0.5 - 350,
        this.game.height * 0.5
      );
      context.fillText(
        "Hold shift to run",
        this.game.width * 0.5 - 350,
        this.game.height * 0.5 + 100
      );

      context.fillText(
        "Space to attack",
        this.game.width * 0.5 - 350,
        this.game.height * 0.5 + 200
      );

      context.fillText(
        "Press Enter To Start",
        this.game.width * 0.5 - 350,
        this.game.height * 0.5 + 300
      );
    }

    //game over
    if (this.game.gameOver) {
      message1 = "BETTER LUCK NEXT TIME!";
      message2 = "YOUR JOURNEY HAS ENDED";
      message3 = "YOUR SCORE";

      context.save();
      context.font = "50px " + this.fontFamily;
      context.textAlign = "center";
      context.shadowOffsetX = 5;
      context.shadowOffsetY = 5;
      context.shadowColor = "black";

      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 300
      );
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 - 240
      );

      context.fillText(
        message3,
        this.game.width * 0.5,
        this.game.height * 0.5 - 100
      );
      context.restore();

      context.fillText(
        "Points: " + this.game.score,
        this.game.width * 0.5 - 350,
        this.game.height * 0.5
      );

      context.fillText(
        "Distance Traveled: " + this.game.distance + "m",
        this.game.width * 0.5 - 350,
        this.game.height * 0.5 + 100
      );

      context.fillText(
        "Press Backspace To Restart",
        this.game.width * 0.5 - 350,
        this.game.height * 0.5 + 300
      );
    }

    //score board
    context.drawImage(this.scoreImage, 0, 0, this.scoreWidth, this.scoreHeight);
    //score
    context.fillText("Score: " + this.game.score, 25, 50);

    //lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 60 * i + 20, 85, 50, 47);
    }
  }
}
