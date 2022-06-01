// Preload all the assets
class Preloader extends Phaser.Scene {
  constructor() {
    super("preLoadScene");
  }

  preload() {
    this.load.path = "assets/";

    // Should contain all assets
    this.load.image("red_background", "art/red_background.png");
    this.load.image("blue_background", "art/blue_background.png");
    this.load.image("green_background", "art/green_background.png");

    this.load.image("play_btn", "art/play_button.png");
    this.load.image("red_picnic", "art/pie_background_1.png");

    this.load.image("player", "art/pie_red.png");
    
    this.load.image('redDoor', './art/door_red.png');
    this.load.image('redButton', './art/button_red.png');



    

    this.createSprite();
    this.createSFX();
  }

  createSFX() {
    // should contain all Sound effects
    this.load.audio('wallBonk','./music/wallBonk.wav');
    this.load.audio('eatEnemy', './music/eatEnemy.wav');
    this.load.audio('getEaten', './music/getEaten.wav');
  }

  createSprite() {
    // load spritesheet for player
    // this.load.spritesheet("enemy", "art/player.png", {
    //   frameWidth: 44,
    //   frameHeight: 44,
    // });

    this.load.spritesheet("bubble", "art/bubble_effect.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet("opening_animation","art/opening_animation.png",{
      frameWidth: 900,
      frameHeight: 640,
    });

    // this.load.spritesheet("testTiles", "art/TestTileSet.png", {
    //   frameWidth: 10,
    //   frameHeight: 10
    // });
    // this.load.tilemapTiledJSON("level_4_map", "art/testlvl.json");    // Tiled JSON file
  }

  create() {
    this.scene.start("start_screenScene");
  }
}
