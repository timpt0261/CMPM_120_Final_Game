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

        this.player = new Player(this, this.game.config.width / 2 , this.game.config.height / 2,'player',10,1).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        
        // 
        this.enemy_1 = new Enemy_Ball(this, 100, 100, 'enemy',100,0).setOrigin(0.5,0.5);

        this.physics.add.overlap(this.player, this.enemy_1, 
            function(enemyEatsPlayer){
                enemyEatsPlayer.body.stop;
                this.physics.world.removeCollider(collider);

            }, null, this);

        this.input.on('pointermove', (pointer) => {
            //console.log(pointer.x,pointer.y);
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        })
    }

    update(){
        this.player.update(this.mouseX,this.mouseY);
        this.enemy_1.update(this.player);
        this.enemy_2.update(this.player);
        
    }

    reset(){

        // this.player.reset();
        this.enemy_1.reset();

    }

    EatenOrAlive(enemy){
        console.log("pop");

        if(enemy.eat_or_die == true){
            // player can consume enemy
            this.enemyGroup.killAndHide(enemy);
            this.player.size += this.enemy.size / 10; // change size

        
        }else{
            // enemy can consume player
            this.Scene.pause();

        }

    }

    createEnemies(){
        this.enemyGroup = this.physics.add.group();
        

        this.enemy_1 = new Enemy_Ball(this, Phaser.Math.Between(50, game.config.width - 100), Phaser.Math.Between(50, game.config.height - 100), "enemy", 50, 0).setOrigin(
            0.5,
            0.5
        );

        this.enemyGroup.add(this.enemy_1);

        this.enemy_2 = new Enemy_Ball(this, Phaser.Math.Between(50, game.config.width - 100), Phaser.Math.Between(50, game.config.height - 100), "enemy", 100, 0).setOrigin(
            0.5,
            0.5
        );

        this.enemyGroup.add(this.enemy_2);

    }
}
