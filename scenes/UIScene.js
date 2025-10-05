export default class UIScene extends Phaser.Scene{
	constructor() {
        super({ key: 'UIScene' });
        this.score = 0; // Armazena a pontuação total do jogo
    }

    create(score) {
        // 1. Cria o Texto da Pontuação
        if(score > 0){
            this.scoreText = this.add.text(16, 16, 'Pontos: ' + score, {
                fontSize: '24px',
                fill: '#FFF',
                backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fundo semi-transparente
            }).setPadding(5);
        }else {
            this.scoreText = this.add.text(16, 16, 'Pontos: 0', {
                fontSize: '24px',
                fill: '#FFF',
                backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fundo semi-transparente
            }).setPadding(5);
        }
        

        // 2. Escuta Eventos de Pontuação de OUTRAS Cenas
        // O Scene Manager emite um evento global 'updatescore' que qualquer cena pode ouvir.
        
        // Obter a referência ao Scene Manager (sys.events)
        //const gameSceneEvents = this.sys.events;

        // Ouve o evento 'updateScore' emitido pelas cenas de Puzzle
        //gameSceneEvents.on('updateScore', this.updateScore, this);
        this.game.events.on('updateScore', this.updateScore, this)
    }
    
    // Função para atualizar a pontuação
    updateScore(points) {
        this.score += points
        
        localStorage.setItem('phaser_saved_score', this.score) // << NOVO CÓDIGO AQUI
        const savedScore = localStorage.getItem('phaser_saved_score')

        this.scoreText.setText('Pontos: ' + savedScore)
    }
}