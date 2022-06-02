class Level_02 extends Phaser.Scene {
  constructor() {
    super("Level_02");
  }

  create(){
    currentScene = 2;
    // set up Phaser-provided cursor key input
    cursors = this.input.keyboard.createCursorKeys();

    // set up Scene switcher
    this.input.keyboard.on("keydown", sceneSwitcher);

    // Add background color
    this.add.tileSprite(0, 0, game.config.height, game.config.width, "yellow_checker")
        .setOrigin(0, 0)
        .setScale(2);

    // Add player
    this.player = new Player(this, this.game.config.width / 2 , this.game.config.height / 2,'pie_red',70, 10000,1).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)

    // Add enemies
    this.createEnemies();


    this.physics.add.collider(this.player, this.enemyGroup, EatOrDie, null, this);


    this.input.on('pointermove', (pointer) => {
        this.mouse = pointer;
    })

    this.input.on('pointerdown', (pointer) =>{
        mode == 0 ? mode = 1 : mode = 0;
        mode == 0 ? console.log("In Grow Mode\n") : console.log("In Shrink Mode\n");
        
    });

    this.bonk = this.sound.add("wallBonk");
    this.eat = this.sound.add("eatEnemy");
    this.getEaten = this.sound.add("getEaten");
}

update(){
    this.player.update(this.mouse);

    this.physics.world.wrap(this.enemyGroup, 32);
    this.enemy_1.update(this.player);
    this.enemy_2.update(this.player);
}

createEnemies(){
    this.enemyGroup = this.physics.add.group();
    let spawn_x =  Phaser.Math.Between(50,game.config.width - 100)
    let spawn_y = Phaser.Math.Between(50, game.config.height - 100);

    this.enemy_1 = new Enemy_Ball(this,spawn_x ,spawn_y , "enemy", 50, 0).setOrigin(
        0.5,
        0.5
    );

    this.enemyGroup.add(this.enemy_1);

    this.enemy_2 = new Enemy_Ball(this,spawn_x, spawn_y, "enemy", 80, 0).setOrigin(
        0.5,
        0.5
    );

    this.enemyGroup.add(this.enemy_2);

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

  // createAnimation(){}
}
