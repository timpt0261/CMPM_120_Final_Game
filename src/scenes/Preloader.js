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

    this.load.image('redDoor', './art/door_red.png');
    this.load.image('redButton', './art/button_red.png');

    // this.load.image("player", "art/player.png");
    this.load.image("enemy", "art/enemy.png");

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
    this.load.spritesheet("player", "art/player.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet("bubble", "art/bubble_effect.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
  }

  create() {
    this.scene.start("Level_01");
  }
}
