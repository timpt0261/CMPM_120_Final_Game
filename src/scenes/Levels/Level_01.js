class Level_01 extends Phaser.Scene {
    constructor() {
    super("Level_01");
    }

    create(){

        currentScene = 1;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set up Scene switcher
        this.input.keyboard.on('keydown', sceneSwitcher);

        // Add background color
        this.add.tileSprite(0, 0, game.config.height, game.config.width, 'red_background').setOrigin(0, 0);
        
        // Add player
        this.player = new Player(this, this.game.config.width / 2 , this.game.config.height / 2,'player',0).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)

    }

    update(){
        this.player.update();


    }

    // createAnimation(){}
}
