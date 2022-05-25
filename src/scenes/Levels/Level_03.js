class Level_03 extends Phaser.Scene {
  constructor() {
    super("Level_03");
  }

  create() {
    currentScene = 3;
    // set up Phaser-provided cursor key input
    cursors = this.input.keyboard.createCursorKeys();

    // set up Scene switcher
    this.input.keyboard.on("keydown", sceneSwitcher);

    this.add.tileSprite(
        0,
        0,
        game.config.height,
        game.config.width,
        "green_background"
      )
      .setOrigin(0, 0)
      .setScale(2);

    // Add player
    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      "player",
      100,
      10000,
      1
    ).setOrigin(0.5, 0.5); //Origin default is (0.5,0.5)

    // Add enemy
    this.enemy_1 = new Enemy_Ball(this, 300, 300, "enemy", 20, 0).setOrigin(
      0.5,
      0.5
    );

    this.physics.add.overlap(
      this.player,
      this.enemy_1,
      function (enemyEatsPlayer) {
        enemyEatsPlayer.body.stop;
        this.physics.world.removeCollider(collider);
      },
      null,
      this
    );

    this.input.on('pointermove', (pointer) => {
      this.mouse = pointer;
    })
  }

  update() {
    this.player.update(this.mouse);
    this.enemy_1.update(this.player);
  }

  // createAnimation(){}
}
