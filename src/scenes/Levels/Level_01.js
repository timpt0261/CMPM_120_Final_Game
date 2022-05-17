class Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
    }

    create(){
        currentScene = 1;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set up Scene switcher
        this.input.keyboard.on('keydown', sceneSwitcher);

        // Add background color
        this.add.tileSprite(0, 0, game.config.height, game.config.width, 'red_background').setOrigin(0,0).setScale(2);
        
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


    }


    // createEnemies(){


    // }
}
