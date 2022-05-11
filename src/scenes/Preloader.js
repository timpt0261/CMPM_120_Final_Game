// Preload all the assets
class Preloader extends Phaser.Scene {
  constructor() {
    super("preLoadScene");
  }

  preload(){
    this.load.path = 'assets/';

    // Should contain all assets

    this.createSFX();

  }

  createSFX(){
    // should contain all Sound effects


  } 

  create(){
    this.scene.start("Level_01");
  }
}
