import Player from './player.js';
import InputHandler from './input.js';
import Background from './background.js';

window.addEventListener('load', () =>{

    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 800;
    
    //game class
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 10;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.Player = new Player(this);
            this.input = new InputHandler();
        }

        update(deltaTime){
            this.background.update();
            this.Player.update(this.input.keys, deltaTime);
        }

        draw(context){
            this.background.draw(context);
            this.Player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    

    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        game.update(deltaTime);
        game.draw(ctx);

        
        
        


        requestAnimationFrame(animate)
    }

    animate(0);

})