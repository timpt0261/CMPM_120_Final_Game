// Preload all the assets
class Preloader extends Phaser.Scene {
  constructor() {
    super("preLoadScene");
  }

  preload() {
   
    // Should contain all assets
    this.createCharAndInt();
    this.createUI();
    this.createBackground();   
    this.createSprite();
    this.createSFX();
    this.createJSON();
  }

  createUI(){
    this.load.path = "assets/art/UI/";
    this.load.image("play_btn", "play_button.png");
    this.load.image("pause", "pause.png");
    this.load.image("restart", "restart.png");
    this.load.image("title", "title.png");
  }
  createCharAndInt(){
    this.load.path = "assets/art/Characters_Interactables/";

    this.load.image("pie_red", "pie_red.png");
    this.load.image("pie_blue", "pie_blue.png");
    
    this.load.image("win_flag", "win_flag.png");

    this.load.image('redDoor', 'door_red.png');
    this.load.image('redButton', 'button_red.png');
    this.load.spritesheet('blueButton', 'button_blue.png',{
      frameWidth: 20,
      frameHeight: 20
    });
    this.load.spritesheet('greenButton', 'button_green.png',{
      frameWidth: 20,
      frameHeight: 20
    });
    this.load.spritesheet('pinkButton', 'button_pink.png',{
      frameWidth: 20,
      frameHeight: 20
    });

  }
  createSFX() {
    this.load.path = "assets";
    // should contain all Sound effects
    this.load.audio('wallBonk','/music/wallBonk.wav');
    this.load.audio('eatEnemy', '/music/eatEnemy.wav');
    this.load.audio('getEaten', '/music/getEaten.wav');
    this.load.audio('bgMusic', '/music/bossa_nova.mp3');
  }

  createBackground(){
    this.load.path = "assets/art/Background/";
    this.load.image("green_checker", "checker_background_1.png");
    this.load.image("blue_checker", "checker_background_2.png");
    this.load.image("red_checker", "pie_background_1.png");
    this.load.image("yellow_checker", "pie_background_2.png");

  }

  createSprite() {
    this.load.path = "assets/art/Animations/";
    // load spritesheet for player

    this.load.spritesheet("enemy", "doughnut_enemy.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet("bubble", "bubble_effect.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet("opening_animation","opening_animation.png",{
      frameWidth: 900,
      frameHeight: 640,
    });


  }

  createJSON(){
    this.load.path = "assets/art/Levels/";
    this.load.image('tiles', 'TestTileSet.png');
    this.load.image('tileset', 'TileSet2.png');
    
    this.load.tilemapTiledJSON("level_1_map", "level1.json");
    this.load.tilemapTiledJSON("level_2_map", "level2.json");

    this.load.tilemapTiledJSON("level_2_map", "level2.json");    


    this.load.tilemapTiledJSON("level_3_map", "level3.json");        

    this.load.tilemapTiledJSON("level_4_map", "testlvl.json");

    this.load.tilemapTiledJSON("level_5_map", "level5.json");  
  }

  create() {
    this.scene.start("start_screenScene");
  }
}
