class Level_04 extends Phaser.Scene {
    constructor() {
        super("Level_04");
    }

    preload(){
        this.load.spritesheet("tile_sheet", "assets/art/TestTileSet.png",{
            frameWidth: 10,
            frameHeight: 10
        });
        this.load.image('tiles', 'assets/art/TestTileSet.png');
        this.load.tilemapTiledJSON("level_4_map", "assets/art/testlvl.json");    // Tiled JSON file
    }    

    create(){
        // set up Phaser-provided cursor key input        
        // set up Scene switcher
        currentScene = 4;
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on("keydown", sceneSwitcher);

        //sounds
        this.bonk = this.sound.add("wallBonk");
        this.eat = this.sound.add("eatEnemy");
        this.getEaten = this.sound.add("getEaten");
        
        // Set up tiles
        const map = this.make.tilemap({key: 'level_4_map'});
        const tileset = map.addTilesetImage('PlsTiles','tiles');

        // Set up the Tiled Layers
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const redDoorLayer = map.createLayer("RedDoor", tileset, 0, 0);
        const yellowDoorLayer = map.createLayer("YellowDoor", tileset, 0, 0);
        const wallLayer = map.createLayer("Walls", tileset, 0, 0);

        // Set any properties from any layers
        wallLayer.setCollisionByProperty({
            collides: true
        });
        redDoorLayer.setCollisionByProperty({
            collides: true
        });
        yellowDoorLayer.setCollisionByProperty({
            collides: true
        });


        // Add objects
        this.buttonGroup = this.physics.add.group();
        this.createObjects(map);

        // adds the player
        this.player;
        this.createPlayer(map);
        
        // Add enemies
        this.enemyGroup = this.physics.add.group();
        this.createEnemies(map);      
        

        // The player acts like a square?
        var redPlayerCollider = this.physics.add.collider(this.player, redDoorLayer);
        var yellowPlayerCollider = this.physics.add.collider(this.player, yellowDoorLayer);
        var redEnemyCollider = this.physics.add.collider(this.enemyGroup, redDoorLayer);
        var yellowEnemyCollider = this.physics.add.collider(this.enemyGroup, yellowDoorLayer);
        this.physics.add.collider(this.player, wallLayer);        
        this.physics.add.collider(this.enemyGroup, wallLayer);
        this.physics.add.collider(this.player, this.enemyGroup, EatOrDie, null, this);

        this.physics.add.overlap(this.player, this.buttonGroup, (player, button) =>{
            if(button.pressed == true){
                return;
            }
            else if(button.pressed == false){
                button.pressed = true;
            }
            
            if(button.color == "yellow"){
                this.physics.world.removeCollider(yellowPlayerCollider);
                this.physics.world.removeCollider(yellowEnemyCollider);
                yellowDoorLayer.forEachTile(tile =>{
                    if(tile.index != -1){
                        tile.alpha = 0.2;
                    }
                });
            }
            if(button.color == "red"){
                this.physics.world.removeCollider(redPlayerCollider);
                this.physics.world.removeCollider(redEnemyCollider);
                redDoorLayer.forEachTile(tile =>{
                    if(tile.index != -1){
                        tile.alpha = 0.2;
                    }
                });
            }
        });


        // Check the collision of the layers. [wallLayer]
        const debugGraphics = this.add.graphics().setAlpha(0.6);
        wallLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37,255)
        });

        // Get pointer refrence
        this.input.on('pointermove', (pointer) => {
            var distX = Phaser.Math.Distance.Between(this.player.x,0, game.config.width /2 , 0);
            var distY = Phaser.Math.Distance.Between(0,this.player.y, 0, game.config.height/2);

            if(this.player.x > game.config.width /2){
                pointer.x += distX;
            }
            else{
                pointer.x -= distX;
            }
            if(this.player.y > game.config.height /2){
                pointer.y += distY;
            }
            else{
                pointer.y -= distY;
            }
            this.mouse = pointer;
        })
        this.cameras.main.startFollow(this.player);
    }

    update(){
        //console.log(this.mouse.x, this.mouse.y,this.player.x, this.player.y);
        //Update player
        this.player.update(this.mouse);

        //Update each enemy in the enemyGroup
        for(var i = 0; i < this.enemyGroup.children.size; i += 1){
            let enemy = this.enemyGroup.children.entries[i];
            enemy.update(this.player);
        }

    }

    createPlayer(map){
        const p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");
        this.p1Size;
        for(let i = 0; i < p1Spawn.properties.length; i += 1){
            if(p1Spawn.properties[i].name == 'size'){
                this.p1Size = p1Spawn.properties[i].value;
            }            
            //console.log(p1Spawn.properties[i].name , p1Spawn.properties[i].value);
        }
        this.player = new Player(this, p1Spawn.x, p1Spawn.y, "player", this.p1Size, 10000, 1).setOrigin(0.5, 0.5); //Origin default is (0.5,0.5)
    }

    createEnemies(map){
        var enemyName = '';
        var enemySize = 1;
        var i = 0;

        // adds the enemies
        while(true){
            i += 1;
            enemyName = "enemySpawn" + i;
            var enemySpawn = map.findObject("Objects", obj => obj.name === enemyName);

            if(!enemySpawn){
                break;
            }
            for(let i = 0; i < enemySpawn.properties.length; i += 1){
                if(enemySpawn.properties[i].name == 'size'){
                    enemySize = enemySpawn.properties[i].value;
                }            
                //console.log(enemySpawn.properties[i].name , enemySpawn.properties[i].value);
            }

            var enemy = new Enemy_Ball(this, enemySpawn.x, enemySpawn.y, "enemy", enemySize, 0).setOrigin(0.5,0.5);
            this.enemyGroup.add(enemy);
        }
    }

    createObjects(map){
        var buttonName = '';
        var buttonColor = '';
        var buttonSize = 1;
        var i = 0;
        // adds the buttons
        while(true){
            i += 1;
            buttonName = "buttonSpawn" + i;
            var buttonSpawn = map.findObject("Objects", obj => obj.name === buttonName);

            if(!buttonSpawn){
                break;
            }
            for(let i = 0; i < buttonSpawn.properties.length; i += 1){
                if(buttonSpawn.properties[i].name == 'door'){
                    buttonColor = buttonSpawn.properties[i].value;
                }         
                if(buttonSpawn.properties[i].name == 'size'){
                    buttonSize = buttonSpawn.properties[i].value;
                }   
            }

            var button = new Button(this, buttonSpawn.x, buttonSpawn.y, "tiles",buttonSize, buttonColor, 0);
            this.buttonGroup.add(button);
        }
    }
}
