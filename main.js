// ...
import GameScene from './scenes/GameScene.js'; // Sua cena de quebra-cabeça
import Puzzle2Scene from './scenes/Puzzle2Scene.js'; // Próxima cena (opcional)

const config = {
    // ... (outras configurações) ...
    
    // Adicione a nova cena aqui:
    scene: [GameScene, Puzzle2Scene]
};

const game = new Phaser.Game(config);