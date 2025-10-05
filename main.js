// ...
import GameScene from './scenes/GameScene.js' // Sua cena de quebra-cabeça
import Puzzle2Scene from './scenes/Puzzle2Scene.js' // Próxima cena (opcional)
import Puzzle3Scene from './scenes/Puzzle3Scene.js'
import Puzzle4Scene from './scenes/Puzzle4Scene.js'
import Puzzle5Scene from './scenes/Puzzle5Scene.js'
import BootScene from './scenes/BootScene.js'
import Transition1Scene from './scenes/Transition1Scene.js'
import UIScene from './scenes/UIScene.js'

const gameScene = new GameScene()
const puzzle2Scene = new Puzzle2Scene()
const puzzle3Scene = new Puzzle3Scene()
const puzzle4Scene = new Puzzle4Scene()
const puzzle5Scene = new Puzzle5Scene()
const transition1Scene = new Transition1Scene()

const uiScene = new UIScene()



const config = {
    type: Phaser.AUTO,
    width: 1360,
    height: 768,
    physics:{
        default: 'arcade',
        arcade:{
            debug: false
        }
    },
    backgroundColor: '#4F361A',
    scale: {
        mode: Phaser.Scale.FIT,

        // Place to the middle of the page.
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    // Adicione a nova cena aqui:
    scene: [BootScene, GameScene, Puzzle2Scene, Puzzle3Scene, Puzzle4Scene, Puzzle5Scene, Transition1Scene, UIScene ],
};

const game = new Phaser.Game(config);

