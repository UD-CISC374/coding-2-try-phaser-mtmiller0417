import Sound from '../sound'

export default class PreloadScene extends Phaser.Scene {

  private play_button:Phaser.GameObjects.Image;

  private music:Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  init(){

  }

  preload() {
    this.load.image('play-button','assets/play-button-1.png');
    this.load.audio('music','assets/background-music.ogg');
  }

  create() {
    if(!Sound.sound_playing){
      this.music = this.sound.add('music',{loop: true});
      this.music.play();
      Sound.sound_playing = true;
    }

    this.play_button = this.add.image(0,0,'play-button');
    // Center the play button
    this.play_button.x = this.cameras.main.centerX;
    this.play_button.y = this.cameras.main.centerY;
    this.play_button.setInteractive();
    // When the button is clicked on, start the main scene
    this.play_button.on('pointerup', () => {
      this.scene.start('GameScene');
    });
    // When the button is hovered over
    this.play_button.on('pointerover',() => {
      this.play_button.setScale(1.1);
    });
    //When the button is not hovered over
    this.play_button.on('pointerout',() => {
      this.play_button.setScale(1);
    });
  }

  update(){

  }
}
