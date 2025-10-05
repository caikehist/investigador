/* global Phaser */
export default class Transition1Scene extends Phaser.Scene{
	constructor(){
		super({key: 'Transition1Scene'})

		this.titleSceneBackgroundImage = null
		this.titleSceneText = null
	}

	init(data){
		this.cameras.main.setBackgroundColor('#4F361A')
	}

	preload() {
		console.log('Transition1Scene')
		this.load.image('Transition1SceneBackground', 'assets/aliens_screen_image.jpg')
	}

	create(data){

		this.titleSceneText = this.add.text(1360 /2, (768 /2) , 'Investigador')
	}

	update(time, delta){

	}


}

function resetGameProgress() {
        // 1. Remove a chave de progresso salvo
        localStorage.removeItem('phaser_saved_stage');
        localStorage.removeItem('phaser_saved_score');
        
        // 2. Opcional: Você pode querer resetar a pontuação na UIScene
        // (A UIScene precisaria de um método de reset e você precisaria de uma referência a ela)
        // Se a pontuação for só em memória, ela será zerada ao recarregar.

        // 3. Para o jogo atual e inicia a primeira cena (GameScene)
        // Isso fará com que o jogo comece do zero.
        this.scene.stop('Transition1Scene'); // Para a cena atual
        this.scene.start('GameScene');      // Começa a primeira fase
        
        // Se você quiser garantir que a UI recarregue a pontuação, 
        // pare e inicie a UI também:
        this.scene.stop('UIScene');
        this.scene.run('UIScene');
    }
