
class Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
         this.isPaused = false;
    }

    create(){

        currentScene = 1;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on("keydown", sceneSwitcher);

        //sounds
        this.bonk = this.sound.add("wallBonk");
        this.eat = this.sound.add("eatEnemy");
        this.getEaten = this.sound.add("getEaten");

        //Background void
        this.background = this.add.tileSprite(0,0,game.config.width*3, game.config.height*3, 'yellow_checker').setOrigin(0.5,0.5);
        
        // Set up tiles
        const map = this.make.tilemap({key: 'level_1_map'});
        const tileset = map.addTilesetImage('TileSet','tileset');

        // Set up the Tiled Layers
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        //const pinkDoorLayer = map.createLayer("PinkDoor", tileset, 0, 0);
        const greenDoorLayer = map.createLayer("GreenDoor", tileset, 0, 0);
        //const blueDoorLayer = map.createLayer("BlueDoor", tileset, 0, 0);
        const wallLayer = map.createLayer("Walls", tileset, 0, 0);

        // Set any properties from any layers
        wallLayer.setCollisionByProperty({
            collides: true
        });
        // redDoorLayer.setCollisionByProperty({
        //     collides: true
        // });
        greenDoorLayer.setCollisionByProperty({
            collides: true
        });
        // blueDoorLayer.setCollisionByProperty({
        //     collides: true
        // });


        // button animations
        // this.anims.create({
        //     key: "blue_pressed",
        //     frames: this.anims.generateFrameNumbers('blueButton', { start: 0, end: -1 }),
        //     frameRate: 12,
        // });

        // this.anims.create({
        //     key: "pink_pressed",
        //     frames: this.anims.generateFrameNumbers('pinkButton', { start: 0, end: -1 }),
        //     frameRate: 12,
        // });

        this.anims.create({
            key: "green_pressed",
            frames: this.anims.generateFrameNumbers('greenButton', { start: 0, end: -1 }),
            frameRate: 12,
        });

        // Add objects
        this.buttonGroup = this.physics.add.group();
        this.win;
        this.createObjects(map);

        // adds the player
        this.player;
        this.createPlayer(map);
        
        // Add enemies
        this.enemyGroup = this.physics.add.group();
        this.createEnemies(map);      
        

        // The player acts like a square?
        //var pinkPlayerCollider = this.physics.add.collider(this.player, pinkDoorLayer);
        var greenPlayerCollider = this.physics.add.collider(this.player, greenDoorLayer);
        //var bluePlayerCollider = this.physics.add.collider(this.player, blueDoorLayer);
        //var pinkEnemyCollider = this.physics.add.collider(this.enemyGroup, pinkDoorLayer);
        var greenEnemyCollider = this.physics.add.collider(this.enemyGroup, greenDoorLayer);
        //var blueEnemyCollider = this.physics.add.collider(this.enemyGroup, blueDoorLayer);

        this.physics.add.collider(this.player, wallLayer);        
        this.physics.add.collider(this.enemyGroup, wallLayer);
        this.physics.add.collider(this.player, this.enemyGroup, EatOrDie, null, this);

        this.physics.add.overlap(this.player, this.win, (player, win) =>{
            this.eat.play();
            this.scene.start("Level_02");
        });

        this.physics.add.overlap(this.player, this.buttonGroup, (player, button) =>{
            if(button.pressed == true){
                return;
            }
            else if(button.pressed == false){
                button.pressed = true;
                this.eat.play();
               
            }
            
            if(button.color == "green"){
                this.physics.world.removeCollider(greenPlayerCollider);
                this.physics.world.removeCollider(greenEnemyCollider);
                greenDoorLayer.forEachTile(tile =>{
                    if(tile.index != -1){
                        tile.alpha = 0.2;
                    }
                });
                button.play("green_pressed");
            }
            if(button.color == "blue"){
                this.physics.world.removeCollider(bluePlayerCollider);
                this.physics.world.removeCollider(blueEnemyCollider);
                blueDoorLayer.forEachTile(tile =>{
                    if(tile.index != -1){
                        tile.alpha = 0.2;
                    }
                });
                // button.play("blue_pressed");
            }
            if(button.color == "pink"){
                this.physics.world.removeCollider(pinkPlayerCollider);
                this.physics.world.removeCollider(pinkEnemyCollider);
                pinkDoorLayer.forEachTile(tile =>{
                    if(tile.index != -1){
                        tile.alpha = 0.2;
                    }
                });
                // button.play("pink_pressed");
            }
        });

        // // Check the collision of the layers. [wallLayer]
        // const debugGraphics = this.add.graphics().setAlpha(0.6);
        // wallLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37,255)
        // });

        // Add pause and reset buttons
        this.pause = this.add.sprite(game.config.width - 80,60, 'pause').setOrigin(.5,.5).setScrollFactor(0);
        this.pause.setInteractive().on('pointerdown',()=>{
            if(this.isPaused == false){
                this.physics.pause();
                this.isPaused = true;
            }else{
                this.physics.resume();
                this.isPaused = false;
            }
        }, this);

        this.reset = this.add.sprite(game.config.width - 40,60, 'restart').setOrigin(.5,.5).setScrollFactor(0);
        this.reset.setInteractive().on('pointerdown',()=>{
            this.scene.restart();
        }, this);

        // Get pointer refrence
        this.input.on('pointermove', (pointer) => {
            var distX = Phaser.Math.Distance.Between(this.player.x,0, game.config.width /2 , 0);
            var distY = Phaser.Math.Distance.Between(0,this.player.y, 0, game.config.height/2);

            //Commenting this entire block would remove a CLICK bug. Perhaps move phase switching to spacebar or middle mouse?
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

        this.input.on('pointerdown', (pointer) =>{
            if(mode == 0){
                mode = 1;
                this.player.setTexture('pie_red');
            }
            else{
                mode = 0;
                this.player.setTexture('pie_blue');
            }
            mode == 0 ? console.log("In Grow Mode\n") : console.log("In Shrink Mode\n");
        });
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
        this.player = new Player(this, p1Spawn.x, p1Spawn.y, "pie_red", this.p1Size, 10000, 0).setOrigin(0.5, 0.5); //Origin default is (0.5,0.5)
    }

    createEnemies(map){
        var enemyName = '';
        var enemySize = 1;
        var enemySpeed = -1;
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
                if(enemySpawn.properties[i].name == 'speed'){
                    enemySpeed = enemySpawn.properties[i].value;
                } 
            }

            var enemy = new Enemy_Ball(this, enemySpawn.x, enemySpawn.y, "enemy", enemySize, enemySpeed, 0).setOrigin(0.5,0.5);
            this.enemyGroup.add(enemy);
        }
    }

    createObjects(map){
        var buttonName = '';
        var buttonColor = '';
        var buttonSprite = '';
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

            if(buttonColor == "green"){
                buttonSprite = "greenButton";
            }
            else if(buttonColor == "blue"){
                buttonSprite = "blueButton";
            }
            else if(buttonColor == "pink"){
                buttonSprite = "pinkButton";
            }
            else{
                console.log("ERROR: Failed to pick sprite");
            }
            var button = new Button(this, buttonSpawn.x, buttonSpawn.y, buttonSprite,buttonSize, buttonColor, 0);
            this.buttonGroup.add(button);
        }

        var flagSpawn = map.findObject("Objects", obj => obj.name === "flagSpawn");
        if(!flagSpawn){
            console.log("ERROR: Flag did not spawn");
            return;
        }
        this.win = new Button(this, flagSpawn.x, flagSpawn.y, "win_flag", 40, "win",0);
    }
}