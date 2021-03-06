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
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    //get backgroundlayers images
    this.backgroundLayer1 = document.getElementById("bgLayer1");
    this.backgroundLayer2 = document.getElementById("bgLayer2");
    this.backgroundLayer3 = document.getElementById("bgLayer3");
    this.backgroundLayer4 = document.getElementById("bgLayer4");
    this.backgroundLayer5 = document.getElementById("bgLayer5");

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
      0.2,
      this.backgroundLayer2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.backgroundLayer3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.backgroundLayer4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.backgroundLayer5
    );

    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
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
    this.width = window.innerWidth;
    this.height = window.innerHeight;

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
