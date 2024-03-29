class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          // e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Shift" ||
          e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      } else if (e.key === "Enter") {
        this.game.menuSelectSound.play();
        this.game.start = !this.game.start;
      } else if (e.key === "Backspace") {
        location.reload();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Shift" ||
        e.key === " "
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}

export default InputHandler;
