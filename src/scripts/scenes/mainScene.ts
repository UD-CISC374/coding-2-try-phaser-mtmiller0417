import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  init(){

  }

  preload() {
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
    // Do stuff here

  }
}
