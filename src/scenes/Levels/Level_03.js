class Level_03 extends Phaser.Scene {
  constructor() {
    super("Level_03");
  }


  create() {
    currentScene = 3;
    // set up Phaser-provided cursor key input
    cursors = this.input.keyboard.createCursorKeys();

    // set up Scene switcher
    this.input.keyboard.on('keydown', sceneSwitcher);

    this.add.tileSprite(0, 0, game.config.height, game.config.width, 'green_background').setOrigin(0, 0).setScale(2);

  }

  update() {


  }

    // createAnimation(){}
}
