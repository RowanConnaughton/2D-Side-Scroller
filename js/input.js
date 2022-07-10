class InputHandler {
  constructor() {
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Shift" ||
          e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
      console.log(this.keys);
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

      console.log(this.keys);
    });
  }
}

export default InputHandler;
