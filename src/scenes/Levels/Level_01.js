class Level_01 extends Phaser.Scene {
    constructor() {
    super("Level_01");
    }

    create(){
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set up Scene switcher
        this.input.keyboard.on('keydown', sceneSwitcher);

    }

    update(){


    }

    // createAnimation(){}
}
