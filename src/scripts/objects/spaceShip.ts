export default class SpaceShip extends Phaser.GameObjects.Sprite {

    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;

    moveIncrement: number = 2;

    x_velocity: number = 0;
    y_velocity: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ship-small');
        scene.add.existing(this);
    }

    preload(){
        
    }
    
    update(){
        if(this.up){
            this.y += -this.moveIncrement;
        } else if(this.down){
            this.y += this.moveIncrement;
        } else if(this.left){
            this.x += -this.moveIncrement;
        } else if(this.right){
            this.x += this.moveIncrement
        }   
    }
}