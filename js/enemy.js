class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    //movement
    if (this.frameY === 2) {
      this.x = +500;
    } else {
      this.x -= this.speedX + this.game.speed;
      this.y += this.speedY;
    }

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;

      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        if (this.frameY !== 2) {
          this.frameX = 0;
          this.frameY = 0;
        } else {
          this.frameX = 8;
        }
      }
    } else {
      this.frameTimer += deltaTime;
    }

    //check if off screen
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  setState(y, x) {
    this.frameY = y;
    this.maxFrame = x;
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 135.5;
    this.height = 97;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById("raven");
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
    this.type = "flying";
  }

  update(deltaTime) {
    super.update(deltaTime);
    //wavy movement pattern
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemySmall extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 360;
    this.height = 360;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById("golem");
    this.speedX = 1;
    this.speedY = 0;
    this.maxFrame = 23;
    this.type = "small";
    this.lives = 3;
    this.score = this.lives;
    this.hurt = false;
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(
        this.x + this.width * 0.4 - 50,
        this.y + this.height * 0.3,
        this.width / 2,
        this.height / 2
      );
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class GroundEnemyLarge extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.type = "large";
    this.width = 1200;
    this.height = 702;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById("troll");
    this.speedX = 1;
    this.speedY = 0;
    this.maxFrame = 9;
    this.frameY = 0;
    this.lives = 6;
    this.score = this.lives;
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(
        this.x + this.width * 0.2 + 70,
        this.y + this.height * 0.3 + 100,
        this.width / 3,
        this.height / 2
      );
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
