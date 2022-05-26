class Level_04 extends Phaser.Scene {
    constructor() {
        super("Level_04");
    }

    preload(){
        // this.load.spritesheet("testTiles", "assets/art/TestTileSet.png", {
        //     frameWidth: 10,
        //     frameHeight: 10
        //   });
        this.load.image('tiles', 'assets/art/TestTileSet.png');
        this.load.tilemapTiledJSON("level_4_map", "assets/art/testlvl.json");    // Tiled JSON file
      
    }    

    create(){
        currentScene = 4;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        // set up Scene switcher
        this.input.keyboard.on("keydown", sceneSwitcher);
        
        // Set up tiles
        const map = this.make.tilemap({key: 'level_4_map'});
        const tileset = map.addTilesetImage('PlsTiles','tiles');

        // Set up the Tiled Layers
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const wallLayer = map.createLayer("Walls", tileset, 0, 0);

        // Set any properties from any layers
        wallLayer.setCollisionByProperty({
            collides: true
        });

        // adds the player
        const p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");
        this.p1Size;

        for(let i = 0; i < p1Spawn.properties.length; i += 1){
            if(p1Spawn.properties[i].name == 'size'){
                this.p1Size = p1Spawn.properties[i].value;
            }            
            console.log(p1Spawn.properties[i].name , p1Spawn.properties[i].value);
        }

        console.log(this.p1Size);
        this.player = new Player(this, p1Spawn.x, p1Spawn.y, "player", this.p1Size, 10000, 1).setOrigin(0.5, 0.5); //Origin default is (0.5,0.5)
        // The player acts like a square?
        this.physics.add.collider(this.player, wallLayer);


        // Check the collision of the layers. [wallLayer]
        // const debugGraphics = this.add.graphics().setAlpha(0.6);
        // wallLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37,255)
        // });


    

        // Get pointer refrence
        this.input.on('pointermove', (pointer) => {
            this.mouse = pointer;
        })
    }

    update(){
        this.player.update(this.mouse);
    }
}