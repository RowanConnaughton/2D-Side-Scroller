
class Background{
    constructor(image, speedModifier, gameSpeed){

        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.image = image;
        this.speedModifier = speedModifier;
        this.gameSpeed = gameSpeed;
        this.speed = this.gameSpeed * this.speedModifier;

    }

    update(){
    
        this.speed = this.gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;

    

    }

    draw(context){
    
        context.drawImage(this.image, this.x ,this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width ,this.y, this.width, this.height)

    }
}

export default Background;