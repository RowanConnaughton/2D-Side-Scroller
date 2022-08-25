import Player from "./player.js";
import InputHandler from "./input.js";
import { Background, Foreground } from "./background.js";
import { FlyingEnemy, GroundEnemySmall, GroundEnemyLarge } from "./enemy.js";
import UI from "./UI.js";
import { SmokeExplosion } from "./explosion.js";
import { Platform } from "./platform.js";

window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  loading.style.display = "none";

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  //game class
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 10;
      this.speed = 0;
      this.maxSpeed = 3;
      this.start = true;
      this.gameOver = false;
      this.background = new Background(this);

      this.player = new Player(this);
      this.foreground = new Foreground(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.explosions = [];
      this.platforms = [];
      this.enemyTimer = 0;
      this.enemyInterval = 3000;
      this.platformTimer = 0;
      this.platformInterval = Math.random() * 10000;
      this.onPlatform = false;
      this.debug = false;
      this.score = 0;
      this.lives = 5;
      this.fontColor = "white";
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();

      this.distance = 0;
    }

    update(deltaTime) {
      this.checkCollision();

      if (this.lives <= 0) {
        this.gameOver = true;
      }

      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //console.log("dist " + this.distance);
      //handle Enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();

        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }

      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      });

      //handle Particles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });

      this.explosions.forEach((explosion) => explosion.update(deltaTime));
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markedForDeletion
      );

      if (this.platformTimer > this.platformInterval) {
        this.addPlatform();

        this.platformTimer = 0;
      } else {
        this.platformTimer += deltaTime;
      }

      this.platforms.forEach((platform) => {
        platform.update();
      });
      this.platforms = this.platforms.filter(
        (platform) => !platform.markedForDeletion
      );

      this.foreground.update();
    }

    draw(context) {
      this.background.draw(context);

      this.platforms.forEach((platform) => {
        platform.draw(context);
      });

      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });

      this.particles.forEach((particle) => {
        particle.draw(context);
      });

      this.explosions.forEach((explosion) => {
        explosion.draw(context);
      });

      console.log();

      this.player.draw(context);

      this.foreground.draw(context);

      this.UI.draw(context);
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.8) {
        this.enemies.push(new GroundEnemySmall(this));
      } else if (this.speed > 0) {
        this.enemies.push(new GroundEnemyLarge(this));
      }

      this.enemies.push(new FlyingEnemy(this));
    }

    addPlatform() {
      if (this.speed > 0 && Math.random() > 0.1) {
        this.platforms.push(new Platform(this));
      }
    }

    checkCollision() {
      this.enemies.forEach((enemy) => {
        switch (enemy.type) {
          case "small":
            //attack
            if (this.player.states[8] === this.player.currentState) {
              if (
                enemy.x + enemy.width * 0.4 - 50 <
                  this.player.x +
                    this.player.width * 0.4 +
                    this.player.width / 2.5 &&
                enemy.x + enemy.width * 0.4 - 50 + enemy.width / 2 >
                  this.player.x + this.player.width * 0.4 &&
                enemy.y + enemy.height * 0.3 <
                  this.player.y + 100 + this.player.height * 0.8 - 100 &&
                enemy.y + enemy.height * 0.3 + enemy.height / 2 >
                  this.player.y + 100
              ) {
                //collision

                if (enemy.lives <= 0) {
                  enemy.markedForDeletion = true;
                  this.score += enemy.score;
                  this.addExplosion(enemy);
                }
                enemy.lives--;

                enemy.x -= -500;
              }
            }
            //walk into enemy
            if (
              enemy.x + enemy.width * 0.4 - 50 <
                this.player.x +
                  this.player.width * 0.4 +
                  this.player.width / 5 &&
              enemy.x + enemy.width * 0.4 - 50 + enemy.width / 2 >
                this.player.x + this.player.width * 0.4 &&
              enemy.y + enemy.height * 0.3 <
                this.player.y + 100 + this.player.height * 0.8 - 100 &&
              enemy.y + enemy.height * 0.3 + enemy.height / 2 >
                this.player.y + 100
            ) {
              //collision

              enemy.x -= -500;

              this.player.setState(12, 0);

              //enemy.markedForDeletion = true;
              if (!this.debug) {
                this.score--;
                this.lives--;
              }
            } else {
            }
            break;

          case "large":
            if (this.player.states[8] === this.player.currentState) {
              if (
                enemy.x + enemy.width * 0.2 + 70 <
                  this.player.x +
                    this.player.width * 0.4 +
                    this.player.width / 2.5 &&
                enemy.x + enemy.width * 0.2 + 70 + enemy.width / 3 >
                  this.player.x + this.player.width * 0.4 &&
                enemy.y + enemy.height * 0.3 + 100 <
                  this.player.y + 100 + this.player.height * 0.8 - 100 &&
                enemy.y + enemy.height * 0.3 + enemy.height / 2 >
                  this.player.y + 100
              ) {
                //collision

                if (enemy.lives <= 0) {
                  this.score += enemy.score;

                  enemy.setState(2, 8);

                  setTimeout(() => {
                    this.addExplosion(enemy);
                    enemy.markedForDeletion = true;
                  }, 800);
                } else {
                  enemy.setState(1, 9);
                  enemy.lives--;
                  enemy.x -= -500;
                }
              }
            }

            //walk into enemy
            if (
              enemy.x + enemy.width * 0.2 + 70 <
                this.player.x +
                  this.player.width * 0.4 +
                  this.player.width / 5 &&
              enemy.x + enemy.width * 0.2 + 70 + enemy.width / 3 >
                this.player.x + this.player.width * 0.4 &&
              enemy.y + enemy.height * 0.3 + 100 <
                this.player.y + 100 + this.player.height * 0.8 - 100 &&
              enemy.y + enemy.height * 0.3 + enemy.height / 2 >
                this.player.y + 100
            ) {
              //collision
              enemy.x -= -500;
              enemy.lives--;
              this.player.setState(12, 0);

              //enemy.markedForDeletion = true;
              if (!this.debug) {
                this.score -= 2;
                this.lives--;
              }
            } else {
            }

            break;
          default:
            if (
              enemy.x <
                this.player.x +
                  this.player.width * 0.4 +
                  this.player.width / 5 &&
              enemy.x + enemy.width > this.player.x + this.player.width * 0.4 &&
              enemy.y < this.player.y + 100 + this.player.height * 0.8 - 100 &&
              enemy.y + enemy.height > this.player.y + 100
            ) {
              //collision
              this.player.setState(12, 0);
              enemy.markedForDeletion = true;
              if (!this.debug) {
                this.score--;
                this.lives--;
              }
            } else {
            }
        }
      });

      this.platforms.forEach((platform) => {
        if (
          this.player.y + this.groundMargin + this.player.height * 0.8 <=
            platform.y &&
          this.player.y +
            this.groundMargin +
            this.player.height * 0.8 +
            this.player.vy >=
            platform.y &&
          this.player.x + this.player.width * 0.4 >= platform.x &&
          this.player.x <= platform.x + platform.width * 0.4
        ) {
          this.player.vy = 0;
          this.onPlatform = !this.onPlatform;
          //this.player.setState(0, 0);
        }
      });
    }

    addExplosion(enemy) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.start) {
      game.update(deltaTime);
    }
    game.draw(ctx);

    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }

  animate(0);
});
