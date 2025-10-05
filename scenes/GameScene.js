export default class GameScene extends Phaser.Scene {
    // É uma boa prática nomear a cena
    constructor() {
        super('GameScene');
    }

    // Método para carregar recursos (assets)
    preload() {
       this.load.image('full_image', 'assets/igreja-de-sao-francisco-de-assis-em-ouro-preto.png');
    }

    // Método para configurar o estado inicial do jogo
    create() {
        const { width, height } = this.sys.game.config;

        this.add.text(width / 2, 50, 'Patrimônio 1: Monte o Quebra-Cabeça!\nIgreja de São Francisco de Assis - Ouro Preto MG', {
            fontSize: '28px',
            fill: '#FFF'
        }).setOrigin(0.5);

        // --- Novas Variáveis para o Quebra-Cabeça ---
        const imageWidth = 800; // Largura desejada da imagem no jogo
        const imageHeight = 600; // Altura desejada da imagem no jogo
        const cols = 2; // Número de colunas
        const rows = 2; // Número de linhas
        const pieceWidth = imageWidth / cols; // Largura de cada peça (200)
        const pieceHeight = imageHeight / rows; // Altura de cada peça (200)
        const targetX = width / 2;
        const targetY = height / 2;

        // 1. Cria a Área de Destino (O "gabarito" do quebra-cabeça)
        // Usaremos a imagem original como gabarito (apenas visual)
        const gabarito = this.add.image(targetX, targetY, 'full_image');
        gabarito.setAlpha(0.15); // Deixa o gabarito transparente
        gabarito.setDisplaySize(imageWidth, imageHeight);
        
        // Array para guardar as peças
        this.pieces = []; 

        // 2. Loop para criar e posicionar as peças
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Posição do frame (pedaço da imagem) dentro do arquivo original
                const frameX = col * (this.textures.get('full_image').source[0].width / cols);
                const frameY = row * (this.textures.get('full_image').source[0].height / rows);

                // Cria uma nova textura temporária para cada peça
                // Isso "corta" um pedaço da imagem original
                const texture = this.textures.get('full_image');
                texture.add(
                    `piece_${row}_${col}`, 
                    0, // index do recurso de imagem (geralmente 0)
                    frameX, 
                    frameY, 
                    texture.source[0].width / cols, 
                    texture.source[0].height / rows
                );

                // Cria o Sprite da Peça
                const piece = this.add.image(
                    Phaser.Math.Between(100, 300), // Posição X aleatória inicial (lado esquerdo)
                    Phaser.Math.Between(150, height - 150), // Posição Y aleatória inicial
                    'full_image', // Usa a textura original...
                    `piece_${row}_${col}` // ... mas com o frame cortado
                );
                
                // Configurações da Peça
                piece.setDisplaySize(pieceWidth, pieceHeight);
                piece.setInteractive();
                piece.setData('targetX', targetX - (imageWidth / 2) + (col * pieceWidth) + (pieceWidth / 2));
                piece.setData('targetY', targetY - (imageHeight / 2) + (row * pieceHeight) + (pieceHeight / 2));
                piece.setData('correctlyPlaced', false);

                // Configura o arrasto (drag)
                this.input.setDraggable(piece);
                this.pieces.push(piece);
            }
        }
        
        // 3. Evento de Arrastar (Mantém o mesmo código de arrasto, mas agora verifica a posição)
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;

            // Define um raio de proximidade para o "encaixe"
            const SNAP_DISTANCE = 15; 
            const targetX = gameObject.getData('targetX');
            const targetY = gameObject.getData('targetY');

            // Verifica se a peça está próxima o suficiente
            if (Phaser.Math.Distance.Between(dragX, dragY, targetX, targetY) < SNAP_DISTANCE) {
                // Encaixa a peça na posição correta
                gameObject.x = targetX;
                gameObject.y = targetY;
                gameObject.disableInteractive(); // Impede que seja arrastada novamente
                gameObject.setData('correctlyPlaced', true);
                
                this.checkWinCondition();
            }
        });

        this.winText = this.add.text(width / 2, height - 50, 'Arraste as peças para montar o quebra-cabeça!', {
            fontSize: '18px',
            fill: '#AAA'
        }).setOrigin(0.5);
    }


    
   // ... (Código da GameScene permanece o mesmo) ...

   // D. Nova função para checar se todas as peças estão no lugar
   checkWinCondition() {
    const allPlaced = this.pieces.every(piece => piece.getData('correctlyPlaced'));
   
    if (allPlaced) {
        this.winText.setText('PARABÉNS! Quebra-Cabeça Concluído!').setFill('#00FF00');
        
        // 1. EMITE A PONTUAÇÃO (Exemplo: 100 pontos pela primeira fase)
        this.game.events.emit('updateScore', 10);

        // 2. SALVA O PROGRESSO: Registra que a próxima cena é a FaseFinalScene
        localStorage.setItem('phaser_saved_stage', 'Puzzle2Scene'); // << NOVO CÓDIGO AQUI
        

        // CORRIGIDO: O nome da cena no construtor da segunda cena é 'Puzzle2Scene'
        this.time.delayedCall(2000, () => this.scene.start('Puzzle2Scene')); // << AQUI ESTÁ A MUDANÇA
    }
   }

   // ...

    // Método chamado a cada frame para a lógica do jogo
    update() {
        // Lógica de movimento, checagem de colisões, etc.
    }
}





