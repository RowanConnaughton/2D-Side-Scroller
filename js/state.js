import { Dust } from "./particle.js";

const states = {
  STANDING_RIGHT: 0,
  STANDING_LEFT: 1,
  WALKING_RIGHT: 2,
  WALKING_LEFT: 3,
  RUNNING_RIGHT: 4,
  RUNNING_LEFT: 5,
  JUMPING_RIGHT: 6,
  JUMPING_LEFT: 7,
  ATTACK_RIGHT: 8,
  ATTACK_LEFT: 9,
  DIE_RIGHT: 10,
  DIE_LEFT: 11,
  HURT_RIGHT: 12,
  HURT_LEFT: 13,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class StandingRight extends State {
  constructor(game) {
    super("STANDING RIGHT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 0;
    this.game.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_LEFT, -2);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_RIGHT, 2);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING_RIGHT, 2);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    }
  }
}

export class StandingLeft extends State {
  constructor(game) {
    super("STANDING LEFT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 1;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_LEFT, -2);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_RIGHT, 2);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING_LEFT, -2);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    }
  }
}

export class WalkingRight extends State {
  constructor(game) {
    super("WALKING RIGHT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_LEFT, -2);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_RIGHT, 2);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING_RIGHT, 2);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    } else if (!input.length) {
      this.game.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class WalkingLeft extends State {
  constructor(game) {
    super("WALKING LEFT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_LEFT, -2);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_RIGHT, 2);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING_LEFT, -2);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    } else if (!input.length) {
      this.game.player.setState(states.STANDING_LEFT, 0);
    }
  }
}

export class RunningRight extends State {
  constructor(game) {
    super("RUNNING RIGHT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 9;
  }
  handleInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height - 80
      )
    );

    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_LEFT, -2);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING_RIGHT, 3);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_RIGHT, 0);
    } else if (!input.length) {
      this.game.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class RunningLeft extends State {
  constructor(game) {
    super("RUNNING LEFT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 9;
  }
  handleInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height - 80
      )
    );
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.game.player.setState(states.RUNNING_RIGHT, 2);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.game.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING_LEFT, -3);
    } else if (input.includes(" ")) {
      this.game.player.setState(states.ATTACK_LEFT, 0);
    } else if (!input.length) {
      this.game.player.setState(states.STANDING_LEFT, 0);
    }
  }
}

export class JumpingRight extends State {
  constructor(game) {
    super("JUMPING RIGHT", game);
  }

  enter() {
    if (this.game.player.onGround()) {
      this.game.player.vy -= 35;
    }
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 6;
  }
  handleInput(input) {
    if (this.game.player.onGround() || this.game.onPlatform) {
      this.game.player.setState(states.WALKING_RIGHT, 1);
    }
  }
}

export class JumpingLeft extends State {
  constructor(game) {
    super("JUMPING LEFT", game);
  }

  enter() {
    if (this.game.player.onGround()) {
      this.game.player.vy -= 30;
    }
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 7;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.WALKING_LEFT, -1);
    }
  }
}

export class AttackRight extends State {
  constructor(game) {
    super("ATTACK RIGHT", game);
    this.run = 0;
  }

  enter() {
    this.run = 0;
    this.game.attackSound.volume = 0.62;
    this.game.attackSound.play();
    this.game.attackSound.loop = true;
    this.game.player.frameX = 1;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 8;
  }
  handleInput(input) {
    if (!input.length && this.game.player.frameX >= 9) {
      this.run += 1;
    }
    if (this.run >= 9) {
      this.game.attackSound.pause();
      this.game.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class AttackLeft extends State {
  constructor(game) {
    super("ATTACK LEFT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 9;
  }
  handleInput(input) {
    if (!input.length) {
      this.game.player.setState(states.STANDING_LEFT, 0);
    }
  }
}

export class DieRight extends State {
  constructor(game) {
    super("DIE RIGHT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 10;
  }
  handleInput(input) {
    if (
      this.game.player.frameX >= 9 &&
      (this.game.player.onGround() || this.game.onPlatform)
    ) {
      this.game.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class DieLeft extends State {
  constructor(game) {
    super("DIE LEFT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 11;
  }
  handleInput(input) {}
}

export class HurtRight extends State {
  constructor(game) {
    super("HURT RIGHT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 12;
  }
  handleInput(input) {
    if (
      this.game.player.frameX >= 9 &&
      (this.game.player.onGround() || this.game.onPlatform)
    ) {
      this.game.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class HurtLeft extends State {
  constructor(game) {
    super("Hurt LEFT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 9;
    this.game.player.frameY = 13;
  }
  handleInput(input) {}
}
