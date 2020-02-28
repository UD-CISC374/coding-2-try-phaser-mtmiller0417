import SpaceShip from '../objects/spaceShip';
import Asteroid from '../objects/asteroid';
import Sound from '../sound'


export default class GameScene extends Phaser.Scene{
    private spaceShip: SpaceShip;
    private asteroid_list:Asteroid[];
    private explosion: Phaser.GameObjects.Sprite;

    private background: Phaser.GameObjects.TileSprite;

    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

    private sceneWidth:number;
    private sceneHeight:number;

    private music:Phaser.Sound.BaseSound;
  
    constructor() {
      super({ key: 'GameScene' });
    }
  
    init(){
      this.sceneWidth = this.cameras.main.width;
      this.sceneHeight = this.cameras.main.height;

      this.asteroid_list = [];
    }
  
    preload() {
      // Load background image
      //this.load.image('background','../../assets/back-reduced.png');
      this.load.image('background','./assets/back-reduced.png');
      //this.load.audio('music','../../assets/background-music.ogg');

      // Load spritesheet for the ship
      this.load.spritesheet('ship-small','./assets/ship-small.png',{
        frameWidth: 60,
        frameHeight: 70 
      });

      // Load spritesheet for the asteroid
      this.load.spritesheet('asteroid-sprite-big','./assets/asteroid-sprite-big.png',{
        frameWidth: 100,
        frameHeight: 197/2 
      });

      // Load spritesheet for explosion
      this.load.spritesheet('explosion','./assets/explosion-small.png',{
        frameWidth: 600/12,
        frameHeight: 50
      });

    }
  
    create() {
      // Only play the sound if it
      /*if(!Sound.sound_playing){
        this.music = this.sound.add('music',{loop: true});
        this.music.play();
        Sound.sound_playing = true;
      }*/

      this.background = this.add.tileSprite(0,0,this.sceneWidth, this.sceneHeight,'background');
      this.background.setOrigin(0,0);

      this.spaceShip = new SpaceShip(this, this.cameras.main.centerX, this.cameras.main.centerY);
      this.anims.create({
        key:'ship-small-anim',
        frames: this.anims.generateFrameNumbers('ship-small',{}),
        frameRate: 25,
        repeat:-1
      });
      this.spaceShip.play('ship-small-anim');

      // Create 4 asteroids
      this.asteroid_list[0] = new Asteroid(this);
      this.asteroid_list[1] = new Asteroid(this);
      this.asteroid_list[2] = new Asteroid(this);
      this.asteroid_list[3] = new Asteroid(this);
      this.asteroid_list[4] = new Asteroid(this);

      this.anims.create({
        key:'asteroid-big-anim',
        frames: this.anims.generateFrameNumbers('asteroid-sprite-big',{}),
        frameRate:10,
        repeat:-1
      });
      this.asteroid_list.forEach(asteroid => {
        asteroid.play('asteroid-big-anim');
        asteroid.setRandom();
      });

      // Create explosion animation, to run once
      // Will call once, will dissapear after 1 completion
      this.anims.create({
        key:'explosion-anim',
        frames: this.anims.generateFrameNumbers('explosion',{}),
        frameRate: 15,
        repeat: 0,
        hideOnComplete: true
      });
    

      this.cursorKeys = this.input.keyboard.createCursorKeys();
      //this.spaceShip

      // Add physics 
      this.physics.world.enable(this.spaceShip);
      this.physics.world.enable(this.asteroid_list);

      //this.physics.add.collider(this.spaceShip, this.asteroid_list);
      this.physics.add.overlap(this.spaceShip, this.asteroid_list, this.collisionDetected, this.collisionDetected, this);
    }
  
    update() {
      this.background.tilePositionY -= 0.5;
      this.moveShipManager(5);
      this.rotateShip();
      this.moveAsteroids();
    }

    // Checks if an asteroid has collided with the ship
    collisionDetected(ship, asteroid){
      // Play explosion animation
      ship.destroy();
      this.explosion = this.add.sprite(this.spaceShip.x, this.spaceShip.y,'explosion');
      this.explosion.play('explosion-anim');
      this.explosion.on('animationcomplete',this.animationCompleted,this);
      //this.explosion = this.add.sprite
    }

    animationCompleted(animation, frame){
      // Restart the game
      this.scene.start('GameScene');
    }

    rotateShip(){
      if(this.cursorKeys.up?.isDown && this.cursorKeys.right?.isDown){
        this.spaceShip.setRotation(Math.PI / 4);
      } else if(this.cursorKeys.up?.isDown && this.cursorKeys.left?.isDown){
        this.spaceShip.setRotation((7 * Math.PI) / 4);
      } else if(this.cursorKeys.down?.isDown && this.cursorKeys.right?.isDown){
        this.spaceShip.setRotation((3 * Math.PI) / 4);
      } else if(this.cursorKeys.down?.isDown && this.cursorKeys.left?.isDown){
        this.spaceShip.setRotation((5 * Math.PI) / 4);
      } else if(this.cursorKeys.up?.isDown){
        this.spaceShip.setRotation(0);
      } else if(this.cursorKeys.down?.isDown){
        this.spaceShip.setRotation(Math.PI);
      } else if(this.cursorKeys.left?.isDown){
        this.spaceShip.setRotation((3 * Math.PI) / 2);
      } else if(this.cursorKeys.right?.isDown){
        this.spaceShip.setRotation(Math.PI / 2);
      }
    }

    // Used to check if the spaceship is out of bounds
    checkBounds(x:number, y:number, x_incr:number, y_incr:number, width:number, height:number):boolean{
      if(x + width/2 + x_incr > this.sceneWidth)
        return false;
      if(x - width/2 +x_incr < 0)
        return false;
      if(y + height/2 + y_incr > this.sceneHeight)
        return false;
      if(y - height/2 + y_incr < 0)
        return false;

      return true;
    }

    moveShipManager(velocity:number):void{
      // Check bounds
      let top_bound:boolean = this.checkBounds(this.spaceShip.x, this.spaceShip.y, 0,-velocity,this.spaceShip.width, this.spaceShip.height);
      let bottom_bound:boolean = this.checkBounds(this.spaceShip.x, this.spaceShip.y, 0,velocity,this.spaceShip.width, this.spaceShip.height);
      let left_bound:boolean = this.checkBounds(this.spaceShip.x, this.spaceShip.y, -velocity, 0,this.spaceShip.width, this.spaceShip.height);
      let right_bound:boolean = this.checkBounds(this.spaceShip.x, this.spaceShip.y, velocity, 0,this.spaceShip.width, this.spaceShip.height);

      // Check if up arrowkey is pressed
      if(this.cursorKeys.up?.isDown && top_bound)
        this.spaceShip.y += -velocity;
      // Check if down arrowkey is pressed
      if(this.cursorKeys.down?.isDown && bottom_bound)
        this.spaceShip.y += velocity;
      // Check if left arrowkey is pressed
      if(this.cursorKeys.left?.isDown && left_bound)
        this.spaceShip.x += -velocity;
      // Check if right arrowkey is pressed
      if(this.cursorKeys.right?.isDown && right_bound)
        this.spaceShip.x += velocity;
    }

    moveAsteroids(){
      this.asteroid_list.forEach(asteroid => {
        // Move asteroids
        asteroid.x += asteroid.x_vel;
        asteroid.y += asteroid.y_vel;

        // If the asteroid is out of bounds
        if(asteroid.x + asteroid.height/2 < 0 || 
           asteroid.x - asteroid.height/2 > this.sceneWidth || 
           asteroid.y + asteroid.width/2 < 0 || 
           asteroid.y - asteroid.width/2> this.sceneHeight){
             // Randomly place the asteroid again
             asteroid.setRandom();
           }
           
      });

    }
  }