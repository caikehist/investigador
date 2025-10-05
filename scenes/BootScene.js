//import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        // Logística de Carregamento de Fase:
        const startSceneKey = this.getInitialSceneKey();
        // 1. INICIA A CENA DE JOGO CORRETA
        this.scene.start(startSceneKey); 
        
        // 2. RODA A UI EM PARALELO
        // A UIScene deve ser sempre executada, não iniciada (start), 
        // para que ela rode junto com a cena de jogo.
        this.scene.run('UIScene', this.getInitialScore()); 
    }

    /**
     * Lógica copiada do seu main.js para determinar a cena inicial.
     */
    getInitialSceneKey() {
        const savedStage = localStorage.getItem('phaser_saved_stage')
        
        // Assegure-se de listar todas as chaves de cena válidas:
        const validScenes = [
            'GameScene', 
            'Puzzle2Scene', 
            'Puzzle3Scene', 
            'Puzzle4Scene', 
            'Puzzle5Scene', 
            'Transition1Scene',
        ];

        if (savedStage && validScenes.includes(savedStage)) {
            return savedStage;
        }
        return 'GameScene';
    }

    getInitialScore(){
    const savedScore = localStorage.getItem('phaser_saved_score');
    if(savedScore){
        return savedScore
    }
}
}