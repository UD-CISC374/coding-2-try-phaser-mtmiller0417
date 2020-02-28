import ExampleObject from '../objects/exampleObject';

export default class MenuScene extends Phaser.Scene {
    private exampleObject: ExampleObject;
  
    constructor() {
      super({ key: 'MenuScene' });
    }
  
    init(){
        
    }
  
    preload() {

    }
  
    create() {
      //this.add.text(20,20,"MAIN MENU");
    }
  
    update() {
      // Do stuff here
  
    }
  }