class Level_04 extends Phaser.Scene {
    constructor() {
        super("Level_04");
    }
 

    create(){
        // set up Phaser-provided cursor key input        
        // set up Scene switcher
        currentScene = 4;
        cursors = this.input.keyboard.createCursorKeys();
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
            //console.log(p1Spawn.properties[i].name , p1Spawn.properties[i].value);
        }
        this.player = new Player(this, p1Spawn.x, p1Spawn.y, "pie_red", this.p1Size, 10000, 1).setOrigin(0.5, 0.5); //Origin default is (0.5,0.5)
        
        // Add enemies
        this.enemyGroup = this.physics.add.group();
        this.createEnemies(map);

        // The player acts like a square?
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.collider(this.enemyGroup, wallLayer);
        this.physics.add.collider(this.player, this.enemyGroup, EatOrDie, null, this);

        // Check the collision of the layers. [wallLayer]
        const debugGraphics = this.add.graphics().setAlpha(0.6);
        wallLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37,255)
        });

        // Get pointer refrence
        this.input.on('pointermove', (pointer) => {
            this.mouse = pointer;
        })
    }

    update(){

        //Update player
        this.player.update(this.mouse);

        //Update each enemy in the enemyGroup
        for(var i = 0; i < this.enemyGroup.children.size; i += 1){
            let enemy = this.enemyGroup.children.entries[i];
            enemy.update(this.player);
        }
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
}
