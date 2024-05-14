import CreditsScene from './CreditsScene.js';
import GameScene from './GameScene.js';
import MainMenuScene from './MainMenuScene.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [MainMenuScene, GameScene, CreditsScene]
};

var game = new Phaser.Game(config);
