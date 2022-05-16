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
     // Add player
     this.player = new Player(this, this.game.config.width / 2 , this.game.config.height / 2,'player',1).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        
    // Orginal ball size is 85
    this.enemy_1 = new Enemy_Ball(this, 100, 100, 'enemy', 0, 85).setOrigin(0.5,0.5);1


  }

    // createAnimation(){}
}
