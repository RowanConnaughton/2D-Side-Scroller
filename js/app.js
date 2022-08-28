import Player from "./player.js";
import InputHandler from "./input.js";
import { Background, Foreground } from "./background.js";
import { FlyingEnemy, GroundEnemySmall, GroundEnemyLarge } from "./enemy.js";
import UI from "./UI.js";
import { SmokeExplosion } from "./explosion.js";
import { Platform } from "./platform.js";
import { PowerUp } from "./powerUp.js";

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
      this.maxSpeed = 6;
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
      this.powerUps = [];
      this.enemyTimer = 0;
      this.enemyInterval = 5000;
      this.platformTimer = 0;
      this.platformInterval = Math.random() * 20000;
      this.onPlatform = false;
      this.powerUpTimer = 0;
      this.powerUpInterval = Math.random() * 8000;
      this.debug = false;
      this.score = 0;
      this.lives = 5;
      this.fontColor = "white";
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.menuSound = new Audio();
      this.menuSound.src = "./assets/audio/menu.wav";
      this.menuSelectSound = new Audio();
      this.menuSelectSound.src = "./assets/audio/menuSelect.wav";
      this.gameSound = new Audio();
      this.gameSound.src = "./assets/audio/level1.wav";
      this.level2Sound = new Audio();
      this.level2Sound.src = "./assets/audio/level2.ogg";
      this.crowSound = new Audio();
      this.crowSound.src = "./assets/audio/crow_caw.wav";
      this.smallEnemyHurtSound = new Audio();
      this.smallEnemyHurtSound.src = "./assets/audio/smallHurt.wav";
      this.largeEnemyHurtSound = new Audio();
      this.largeEnemyHurtSound.src = "./assets/audio/largeHurt.wav";
      this.smallEnemyDeathSound = new Audio();
      this.smallEnemyDeathSound.src = "./assets/audio/smallDeath.wav";
      this.largeEnemyDeathSound = new Audio();
      this.largeEnemyDeathSound.src = "./assets/audio/largeDeath.wav";
      this.heartSound = new Audio();
      this.heartSound.src = "./assets/audio/heart.flac";
      this.attackSound = new Audio();
      this.attackSound.src = "./assets/audio/attack.wav";
      this.hurtSound = new Audio();
      this.hurtSound.src = "./assets/audio/hurt.wav";
      this.distance = 0;
      this.level2 = false;
    }

    update(deltaTime) {
      this.checkCollision();

      if (this.distance > 100) {
        this.level2 = true;
      }

      if (this.start) {
        this.speed = 0;
        this.menuSound.volume = 0.2;
        this.menuSound.play();

        this.menuSound.loop = true;
        this.gameSound.pause();
        this.level2Sound.pause();
      } else {
        this.gameSound.volume = 0.2;
        this.gameSound.play();

        this.gameSound.loop = true;
        this.menuSound.pause();

        if (this.level2) {
          this.gameSound.pause();
          this.level2Sound.volume = 0.2;
          this.level2Sound.play();
          this.level2Sound.loop = true;
        }
      }

      if (this.lives <= 0) {
        this.gameOver = true;
      }

      this.background.update();

      if (!this.start) {
        if (!this.gameOver) {
          this.player.update(this.input.keys, deltaTime);

          if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();

            this.enemyTimer = 0;
          } else {
            this.enemyTimer += deltaTime;
          }

          //handle Enemies

          this.enemies.forEach((enemy) => {
            enemy.update(deltaTime);
            if (enemy.markedForDeletion) {
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
          });

          //console.log("dist " + this.distance);

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

          //power up
          if (this.powerUpTimer > this.powerUpInterval) {
            this.addPowerUp();

            this.powerUpTimer = 0;
          } else {
            this.powerUpTimer += deltaTime;
          }

          this.powerUps.forEach((powerUp) => {
            powerUp.update();
          });
          this.powerUps = this.powerUps.filter(
            (powerUp) => !powerUp.markedForDeletion
          );

          this.foreground.update();
        }
      }
    }

    draw(context) {
      this.background.draw(context);

      this.platforms.forEach((platform) => {
        platform.draw(context);
      });

      this.powerUps.forEach((powerUp) => {
        powerUp.draw(context);
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
      if (this.speed > 0 && Math.random() > 0.8) {
        this.platforms.push(new Platform(this));
      }
    }

    addPowerUp() {
      if (this.speed > 0 && Math.random() >= 0.6) {
        this.powerUps.push(new PowerUp(this));
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
                  this.smallEnemyHurtSound.pause();
                  this.smallEnemyDeathSound.volume = 0.42;
                  this.smallEnemyDeathSound.play();
                  enemy.markedForDeletion = true;
                  this.score += enemy.score;
                  this.addExplosion(enemy);
                } else {
                  this.smallEnemyHurtSound.volume = 0.42;
                  this.smallEnemyHurtSound.play();
                  enemy.lives--;
                  enemy.x -= -500;
                }
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

              if (enemy.lives <= 0) {
                this.smallEnemyHurtSound.pause();
                this.smallEnemyDeathSound.volume = 0.42;
                this.smallEnemyDeathSound.play();
                enemy.markedForDeletion = true;
                this.addExplosion(enemy);
              } else {
                enemy.x -= -500;
                enemy.lives--;
                this.smallEnemyHurtSound.volume = 0.42;
                this.smallEnemyHurtSound.play();
                this.hurtSound.volume = 0.32;
                this.hurtSound.play();
                this.player.setState(12, 0);
              }

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
                  this.largeEnemyHurtSound.pause();
                  this.largeEnemyDeathSound.volume = 0.42;
                  this.largeEnemyDeathSound.play();

                  enemy.setState(2, 8);

                  setTimeout(() => {
                    this.addExplosion(enemy);
                    enemy.markedForDeletion = true;
                  }, 800);
                } else {
                  this.largeEnemyHurtSound.volume = 0.42;
                  this.largeEnemyHurtSound.play();
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

              if (enemy.lives <= 0) {
                this.largeEnemyHurtSound.pause();
                this.largeEnemyDeathSound.volume = 0.42;
                this.largeEnemyDeathSound.play();

                enemy.setState(2, 8);

                setTimeout(() => {
                  this.addExplosion(enemy);
                  enemy.markedForDeletion = true;
                }, 800);
              } else {
                this.largeEnemyHurtSound.volume = 0.42;
                this.largeEnemyHurtSound.play();
                this.hurtSound.volume = 0.32;
                this.hurtSound.play();
                this.player.setState(12, 0);
                enemy.setState(1, 9);
                enemy.lives--;
                enemy.x -= -500;
              }

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
              this.crowSound.volume = 0.82;
              this.crowSound.play();
              this.hurtSound.volume = 0.32;
              this.hurtSound.play();
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

      this.powerUps.forEach((powerUp) => {
        if (
          powerUp.x + powerUp.width <
            this.player.x + this.player.width * 0.4 + this.player.width / 5 &&
          powerUp.x + powerUp.width + powerUp.width >
            this.player.x + this.player.width * 0.4 &&
          powerUp.y + powerUp.height <
            this.player.y + 100 + this.player.height * 0.8 - 100 &&
          powerUp.y + powerUp.height + powerUp.height > this.player.y + 100
        ) {
          //collision
          this.heartSound.volume = 0.62;
          this.heartSound.play();

          powerUp.markedForDeletion = true;

          if (this.lives < 5) {
            this.lives++;
          }
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

  const FPS = 60;
  let prevTick = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (!game.gameOver || !game.start) {
      requestAnimationFrame(animate);
    }

    // clamp to fixed framerate

    let now = Math.round((FPS * Date.now()) / 1000);
    if (now == prevTick) return;
    prevTick = now;

    // otherwise, do your stuff ...
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(deltaTime);

    game.draw(ctx);
  }

  animate(0);
});
