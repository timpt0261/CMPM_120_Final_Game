class Level_04 extends Phaser.Scene {
    constructor() {
        super("Level_04");
    }

    preload(){
        this.load.spritesheet("testTiles", "art/TestTileSet.png", {
            frameWidth: 10,
            frameHeight: 10
          });
        this.load.tilemapTiledJSON("level_4_map", "art/testlvl.json");    // Tiled JSON file
      
    }    

    create(){
        currentScene = 4;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        // set up Scene switcher
        this.input.keyboard.on("keydown", sceneSwitcher);
        
        // Set up tiles
        this.map = this.add.tilemap("level_4_map");


        // Add player
        this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2, "player", 100, 10000, 1).setOrigin(0.5, 0.5); //Origin default is (0.5,0.5)

        // Get pointer refrence
        this.input.on('pointermove', (pointer) => {
            this.mouse = pointer;
        })
    }

    update(){
        this.player.update(this.mouse);4
    }
}