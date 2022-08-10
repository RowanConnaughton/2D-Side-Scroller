import {
  StandingRight,
  StandingLeft,
  WalkingRight,
  WalkingLeft,
  RunningRight,
  RunningLeft,
  JumpingRight,
  JumpingLeft,
  AttackRight,
  AttackLeft,
  DieRight,
  DieLeft,
  HurtRight,
  HurtLeft,
} from "./state.js";

class Player {
  constructor(game) {
    this.game = game;
    this.width = 917;
    this.height = 403;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight = 0.8;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 9;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 5;
    this.states = [
      new StandingRight(this.game),
      new StandingLeft(this.game),
      new WalkingRight(this.game),
      new WalkingLeft(this.game),
      new RunningRight(this.game),
      new RunningLeft(this.game),
      new JumpingRight(this.game),
      new JumpingLeft(this.game),
      new AttackRight(this.game),
      new AttackLeft(this.game),
      new DieRight(this.game),
      new DieLeft(this.game),
      new HurtRight(this.game),
      new HurtLeft(this.game),
    ];
  }

  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);

    //horizontal movement
    this.x += this.speed;

    if (input.includes("ArrowRight")) {
      this.speed = this.maxSpeed;
    } else if (input.includes("ArrowLeft")) {
      this.speed = -this.maxSpeed;
    } else {
      this.speed = 0;
    }

    //horrizontal limits
    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > this.game.width - this.game.width + 100) {
      this.x = this.game.width - this.game.width + 100;
    }

    //vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }

    //vertical limit
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }

    //sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;

      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(
        this.x + this.width * 0.4,
        this.y + 100,
        this.width / 5,
        this.height * 0.8 - 100
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

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      switch (enemy.type) {
        case "small":
          if (
            enemy.x + enemy.width * 0.4 - 50 <
              this.x + this.width * 0.4 + this.width / 5 &&
            enemy.x + enemy.width * 0.4 - 50 + enemy.width / 2 >
              this.x + this.width * 0.4 &&
            enemy.y + enemy.height * 0.3 <
              this.y + 100 + this.height * 0.8 - 100 &&
            enemy.y + enemy.height * 0.3 + enemy.height / 2 > this.y + 100
          ) {
            //collision

            enemy.x -= -500;

            this.setState(12, 0);

            //enemy.markedForDeletion = true;
            this.game.score--;
            this.game.lives--;
          } else {
          }
          break;

        case "large":
          if (
            enemy.x + enemy.width * 0.2 + 70 <
              this.x + this.width * 0.4 + this.width / 5 &&
            enemy.x + enemy.width * 0.2 + 70 + enemy.width / 3 >
              this.x + this.width * 0.4 &&
            enemy.y + enemy.height * 0.3 + 100 <
              this.y + 100 + this.height * 0.8 - 100 &&
            enemy.y + enemy.height * 0.3 + 100 + enemy.height / 2 > this.y + 100
          ) {
            //collision
            enemy.markedForDeletion = true;
            this.game.score--;
          } else {
          }
          break;
        default:
          if (
            enemy.x < this.x + this.width * 0.4 + this.width / 5 &&
            enemy.x + enemy.width > this.x + this.width * 0.4 &&
            enemy.y < this.y + 100 + this.height * 0.8 - 100 &&
            enemy.y + enemy.height > this.y + 100
          ) {
            //collision
            enemy.markedForDeletion = true;
            this.game.score--;
          } else {
          }
      }
    });
  }
}

export default Player;
