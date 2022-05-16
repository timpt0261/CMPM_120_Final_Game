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
    this.load.image("player", "art/main_player1.png");
    this.load.image("enemy", "art/enemy.png");

    this.createSFX();
  }

  createSFX() {
    // should contain all Sound effects
  }

  create() {
    this.scene.start("Level_01");
  }
}
