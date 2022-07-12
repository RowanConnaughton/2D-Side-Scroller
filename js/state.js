export const states = {
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
  constructor(state) {
    this.state = state;
  }
}

export class StandingRight extends State {
  constructor(player) {
    super("STANDING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 0;
    this.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_LEFT, -1.5);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_RIGHT, 1.5);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING_RIGHT, 1);
    } else if (input.includes(" ")) {
      this.player.setState(states.ATTACK_RIGHT, 0);
    }
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super("STANDING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_LEFT, -1.5);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_RIGHT, 1.5);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING_LEFT, -1);
    } else if (input.includes(" ")) {
      this.player.setState(states.ATTACK_LEFT, 0);
    }
  }
}

export class WalkingRight extends State {
  constructor(player) {
    super("WALKING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 2;
    this.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_LEFT, -1.5);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_RIGHT, 1.5);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING_RIGHT, 1);
    } else if (input.includes(" ")) {
      this.player.setState(states.ATTACK_RIGHT, 0);
    } else if (!input.length) {
      this.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class WalkingLeft extends State {
  constructor(player) {
    super("WALKING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_LEFT, -1.5);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_RIGHT, 1.5);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING_LEFT, -1);
    } else if (input.includes(" ")) {
      this.player.setState(states.ATTACK_LEFT, 0);
    } else if (!input.length) {
      this.player.setState(states.STANDING_LEFT, 0);
    }
  }
}

export class RunningRight extends State {
  constructor(player) {
    super("RUNNING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 4;
    this.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowLeft") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_LEFT, -1.5);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING_RIGHT, 1);
    } else if (input.includes(" ")) {
      this.player.setState(states.ATTACK_RIGHT, 0);
    } else if (!input.length) {
      this.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class RunningLeft extends State {
  constructor(player) {
    super("RUNNING LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.frameY = 5;
    this.player.maxFrame = 9;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_LEFT, -1);
    } else if (input.includes("ArrowRight") && input.includes("Shift")) {
      this.player.setState(states.RUNNING_RIGHT, 1.5);
    } else if (input.includes("ArrowRight") && !input.includes("Shift")) {
      this.player.setState(states.WALKING_RIGHT, 1);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING_LEFT, -1);
    } else if (input.includes(" ")) {
      this.player.setState(states.ATTACK_LEFT, 0);
    } else if (!input.length) {
      this.player.setState(states.STANDING_LEFT, 0);
    }
  }
}

export class JumpingRight extends State {
  constructor(player) {
    super("JUMPING RIGHT");
    this.player = player;
  }

  enter() {
    if (this.player.onGround()) {
      this.player.vy -= 30;
    }
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 6;
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.WALKING_RIGHT, 1);
    }
  }
}

export class JumpingLeft extends State {
  constructor(player) {
    super("JUMPING LEFT");
    this.player = player;
  }

  enter() {
    if (this.player.onGround()) {
      this.player.vy -= 30;
    }
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 7;
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.WALKING_LEFT, -1);
    }
  }
}

export class AttackRight extends State {
  constructor(player) {
    super("ATTACK RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 8;
  }
  handleInput(input) {
    if (!input.length) {
      this.player.setState(states.STANDING_RIGHT, 0);
    }
  }
}

export class AttackLeft extends State {
  constructor(player) {
    super("ATTACK LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 9;
  }
  handleInput(input) {
    if (!input.length) {
      this.player.setState(states.STANDING_LEFT, 0);
    }
  }
}

export class DieRight extends State {
  constructor(player) {
    super("DIE RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 10;
  }
  handleInput(input) {}
}

export class DieLeft extends State {
  constructor(player) {
    super("DIE LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 11;
  }
  handleInput(input) {}
}

export class HurtRight extends State {
  constructor(player) {
    super("HURT RIGHT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 12;
  }
  handleInput(input) {}
}

export class HurtLeft extends State {
  constructor(player) {
    super("Hurt LEFT");
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 9;
    this.player.frameY = 13;
  }
  handleInput(input) {}
}
