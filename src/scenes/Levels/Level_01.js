class Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
    }


    create(){
        currentScene = 1;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set up Scene switcher
        this.input.keyboard.on("keydown", sceneSwitcher);

        // Add background color
        this.add.tileSprite(0, 0, game.config.height, game.config.width, "red_background")
            .setOrigin(0, 0)
            .setScale(2);

        // Add player
        this.player = new Player(this, this.game.config.width / 2 , this.game.config.height / 2,'player',70, 10000,1).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)

        // Add enemies
        this.createEnemies();

        // Add obstacles
        this.createObstacles();

        this.physics.add.collider(this.player, this.enemyGroup, this.EatenOrAlive, null, this);

        this.input.on('pointermove', (pointer) => {
            this.mouse = pointer;
        })

        this.bonk = this.sound.add("wallBonk");
        this.eat = this.sound.add("eatEnemy");
        this.getEaten = this.sound.add("getEaten");
    }

    update(){
        this.player.update(this.mouse);
        this.enemy_1.update(this.player);
        this.enemy_2.update(this.player); 
    }


    EatenOrAlive(player,enemy){
        
        let sizeDiff = player.size - enemy.size;
        if(sizeDiff > 0 ){
            // player can consume enemy
            this.enemyGroup.destroy(enemy);

            player.body.setSize(200, 200);
            player.body.setCircle(100);

            // player.setScale(1.5);
            // player.size += enemy.size;
            
            
            
            this.eat.play();

        
        }else if (sizeDiff <= 0){
            // enemy can consume player
            // game over condtionsddddd
            console.log("pop");
            this.physics.pause();
            this.player.alpha = 0.3;
            
            
            this.getEaten.play();

        }

    }

    createEnemies(){
        this.enemyGroup = this.physics.add.group();
        

        this.enemy_1 = new Enemy_Ball(this, Phaser.Math.Between(50, game.config.width - 100), Phaser.Math.Between(50, game.config.height - 100), "enemy", 50, 0).setOrigin(
            0.5,
            0.5
        );

        this.enemyGroup.add(this.enemy_1);

        this.enemy_2 = new Enemy_Ball(this, Phaser.Math.Between(50, game.config.width - 100), Phaser.Math.Between(50, game.config.height - 100), "enemy", 80, 0).setOrigin(
            0.5,
            0.5
        );

        this.enemyGroup.add(this.enemy_2);

        this.enemyGroup.colliderWorldBounds = true;


    }

    createObstacles(){
        //create door
        this.redDoor = new Door(this, 60, 60, "redDoor", 0).setOrigin(0,0);
        //create button
        this.redButton = new Button(this, 40, 40, "redButton", 0, this.redDoor).setOrigin(0, 0);

        //link the button and door so they can pass signals 

        //create collision group between the button and player
            //callback function that calls the makes the button make the door disappear 
    }
}
