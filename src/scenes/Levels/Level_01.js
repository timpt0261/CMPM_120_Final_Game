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

        this.add.tileSprite(0, 0, game.config.height, game.config.width, 'red_background').setOrigin(0, 0);

    }

    update(){


    }

    // createAnimation(){}
}
