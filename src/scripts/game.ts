import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import MenuScence from './scenes/menuScene';
import GameScene from './scenes/gameScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;

const config: GameConfig = {
    //backgroundColor:'#fffff',
    scale: {
        parent: 'phaser-game',
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    // Put all the scenes in here
    scene: [PreloadScene, MenuScence, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    "transparent": true
};

// On window load, start the game?
window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});