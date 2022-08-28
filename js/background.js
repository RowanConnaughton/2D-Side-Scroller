class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x < -this.width) {
      this.x = 0;
      this.game.distance++;
    } else {
      this.x -= this.game.speed * this.speedModifier;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1920;
    this.height = 1080;

    //get backgroundlayers images
    this.backgroundLayer1 = document.getElementById("bgLayer1L1");
    this.backgroundLayer2 = document.getElementById("bgLayer2L1");
    this.backgroundLayer3 = document.getElementById("bgLayer3L1");
    this.backgroundLayer4 = document.getElementById("bgLayer4L1");

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.backgroundLayer1
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.backgroundLayer2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.backgroundLayer3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.backgroundLayer4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1.2,
      this.backgroundLayer5
    );

    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
    ];
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }

  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}

export class Foreground {
  constructor(game) {
    this.game = game;
    this.width = 1920;
    this.height = 1080;

    this.foregroundLayer5 = document.getElementById("bgLayer5");

    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.foregroundLayer5
    );
  }

  update() {
    this.layer5.update();
  }

  draw(context) {
    this.layer5.draw(context);
  }
}
