
import Background from './background.js';

window.addEventListener('load', () =>{

    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let gameSpeed = 1;

    //get backgroundlayers
    const backgroundLayer1 = document.getElementById('bgLayer1');
    const backgroundLayer2 = document.getElementById('bgLayer2');
    const backgroundLayer3 = document.getElementById('bgLayer3');
    const backgroundLayer4 = document.getElementById('bgLayer4');
    const backgroundLayer5 = document.getElementById('bgLayer5');

    const layer1 = new Background(backgroundLayer1, 0.2, gameSpeed);
    const layer2 = new Background(backgroundLayer2, 0.4,gameSpeed);
    const layer3 = new Background(backgroundLayer3, 0.6,gameSpeed);
    const layer4 = new Background(backgroundLayer4, 0.8,gameSpeed);
    const layer5 = new Background(backgroundLayer5, 1,gameSpeed);
    
    const backgroundLayers = [layer1, layer2, layer3, layer4, layer5];

    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        backgroundLayers.forEach(layer => {
            layer.update();
            layer.draw(ctx);
        })

        // player.update(input.lastKey);
        // player.draw(ctx, deltaTime);
        // drawStatusText(ctx, input, player);
        


        requestAnimationFrame(animate)
    }

    animate(0);

})