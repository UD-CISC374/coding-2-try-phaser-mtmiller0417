export default class Asteroid extends Phaser.GameObjects.Sprite {

    maxVelocity:number = 8;
    minVelocity:number = 4;

    x_vel:number = 0;
    y_vel:number = 0;

    scene: Phaser.Scene;
    sceneWidth: number;
    sceneHeight: number;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'asteroid-sprite-big');
        scene.add.existing(this);
        this.scene = scene;
        this.sceneWidth = this.scene.cameras.main.width;
        this.sceneHeight = this.scene.cameras.main.height;
    }

    setTop():void{
        // Set location
        this.x = Math.floor(Math.random() * (this.sceneWidth-this.width/2) + this.width/2);
        //this.y = -this.height/2;
        this.y = 0;
        // Set velocity
        this.x_vel = 0;
        this.y_vel = Math.floor(Math.random() * this.maxVelocity + this.minVelocity)
    }
    setBottom(){
        // Set location
        this.x = Math.floor(Math.random() * (this.sceneWidth-this.width/2));
        //this.y = this.sceneHeight + this.height/2;
        this.y = this.sceneHeight;
        // Set velocity
        this.x_vel = 0;
        this.y_vel = -Math.floor(Math.random() * this.maxVelocity + this.minVelocity)
    }
    setLeft(){
        // Set location
        //this.x = -this.width/2;
        this.x = 0;
        this.y = Math.floor(Math.random() * (this.sceneHeight - this.height/2));
        // Set velocity
        this.x_vel = Math.floor(Math.random() * this.maxVelocity + this.minVelocity);
        this.y_vel = 0;
    }
    setRight(){
        // Set location
        //this.x = this.sceneWidth + this.width/2;
        this.x = this.sceneWidth;
        this.y = Math.floor(Math.random() * (this.sceneHeight - this.height/2) + this.height/2);
        // Set velocity
        this.x_vel = -Math.floor(Math.random() * this.maxVelocity + this.minVelocity);
        this.y_vel = 0;
    }

    setRandom(){
        switch(Math.floor(Math.random() * 4)) { 
            // Asteroid will come from the top
            case 0: { 
                this.setTop();
               break; 
            } 
            // Asteroid will come from the bottom
            case 1: { 
                this.setBottom(); 
               break; 
            } 
            // Asteroid will come from the left
            case 2: { 
                this.setLeft();
                break; 
             } 
            // Asteroid will come from the right
            case 3: { 
                this.setRight(); 
                break; 
             } 
            default: { 
               //statements; 
               break; 
            } 
        } 
    }
}
