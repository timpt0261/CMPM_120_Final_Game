class Level_02 extends Phaser.Scene {
  constructor() {
    super("Level_02");
  }

  create() {

    currentScene = 2;
    // set up Phaser-provided cursor key input
    cursors = this.input.keyboard.createCursorKeys();

    // set up Scene switcher
    this.input.keyboard.on('keydown', sceneSwitcher);

    this.add.tileSprite(0, 0, game.config.height, game.config.width, 'blue_background').setOrigin(0, 0).setScale(2);

  }

  update() {


  }

    // createAnimation(){}
}
